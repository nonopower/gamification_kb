/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useCallback } from 'react'
import SideMenu from './SideMenu'
import BattleRightInfo from './BattleRightInfo'
import './battle.scss'
import axios from 'axios'
import config from '../../config.json'
import url from '../../url.json'
import { genEdge, genNode } from './../../utils/ideaTool'
import io from 'socket.io-client'
import Graph from 'react-vis-network-graph'
import { options } from './../../utils/battle-tools'
import { ViewNode } from './../../components/ViewNode'
import { useDispatch, useSelector } from 'react-redux'
import { setPoint } from '../../redux/counterSlice'

export default function Battle() {
   // user 點數紀錄
   const point = useSelector((state) => state.point)
   const dispatch = useDispatch()

   const [open, setOpen] = useState(false)
   const [nodeContent, setNodeContent] = useState(null)
   const [ws, setSocket] = useState(null)
   const [graph, setGraph] = useState({
      nodes: [],
      edges: [],
   })

   const events = {
      click: (event) => {
         // 閱讀
         dispatch(setPoint(1))
         const read = +localStorage.getItem('read')
         localStorage.setItem('read', read + 1)
         if (event.nodes.length === 1) {
            handleClickOpen(event.nodes[0])
            localStorage.setItem('nodeId', event.nodes[0])
         }
      },
      dragEnd: (event) => {
         const dragNodeId = event.nodes[0]
         if (dragNodeId) {
            const nodePositions = event.pointer.DOM
            graph.nodes.forEach((element) => {
               if (element.id === dragNodeId) {
                  element.x = nodePositions.x
                  element.y = nodePositions.y
               }
            })
         }
      },
   }

   const fetchGroupData = useCallback(async () => {
      const enterDifferentGroupEndpoint = `${url.backendHost}${config[16].EnterDifferentGroup}${localStorage.getItem('joinCode')}/${localStorage.getItem('userId')}`
      const getMyGroupEndpoint = `${url.backendHost}${config[12].getMyGroup}/${localStorage.getItem('activityId')}/${localStorage.getItem('userId')}`

      try {
         const response = await axios.get(enterDifferentGroupEndpoint, {
            headers: {
               authorization: 'Bearer JWT Token',
            },
         })
         localStorage.setItem('groupId', response.data.data[0].id)
      } catch (error) {
         try {
            const response = await axios.get(getMyGroupEndpoint, {
               headers: {
                  authorization: 'Bearer JWT Token',
               },
            })
            localStorage.setItem('groupId', response.data.data[0].id)
         } catch (error) {
            console.error(error)
         }
      } finally {
         await getNodes()
      }
   }, [])

   const getNodes = useCallback(async () => {
      if (localStorage.getItem('groupId') == null) {
         const asyncFn = async () => {
            await fetchGroupData()
         }

         asyncFn()
      }

      const fetchData = await axios.get(
         `${url.backendHost + config[8].getNode}/${localStorage.getItem('groupId')}`,
         {
            headers: {
               authorization: 'Bearer JWT Token',
            },
         },
      )

      const fetchEdge = await axios.get(
         `${url.backendHost + config[10].getEdge}/${localStorage.getItem('groupId')}`,
         {
            headers: {
               authorization: 'Bearer JWT Token',
            },
         },
      )

      const nodeData = fetchData.data[0].Nodes.map((node) => genNode(node))

      const edgeData = fetchEdge.data.map((edge) => genEdge(edge))

      localStorage.setItem('nodeDataLength', nodeData.length + 1)
      setGraph({
         nodes: nodeData,
         edges: edgeData,
      })
   }, [])

   const handleClickOpen = (nodeId) => {
      setNodeContent(null)
      setOpen(true)
      fetchNodeData(nodeId)
   }

   const fetchNodeData = useCallback(async (nodeId) => {
      try {
         const response = await axios.get(
            `${url.backendHost + config[11].getOneNode}/${nodeId}`,
         )
         setNodeContent(response.data)
      } catch (err) {
         console.error(err)
      }
   }, [])

   const handleClose = () => {
      setOpen(false)
   }

   useEffect(() => {
      async function fetchData() {
         await fetchGroupData()
         setSocket(io.connect(url.socketioHost))
      }
      fetchData()
   }, [fetchGroupData, fetchNodeData])

   // online
   // const host = 'http://111.184.127.25:56000'
   // const queryParams = { userId: 100 }
   // const socket = io(host, {
   //    path: '/pathToConnection',
   //    transports: ['websocket'],
   //    upgrade: false,
   //    query: queryParams,
   //    reconnection: false,
   //    rejectUnauthorized: false,
   // })

   // socket.once('connect', () => {
   //    socket.on('online', (userId) => {
   //       console.log(userId, 'Is Online!')
   //    })

   //    socket.on('offline', (userId) => {
   //       console.log(userId, 'Is Offline!')
   //    })
   // })

   return (
      <>
         <div className="battle-container">
            <SideMenu ws={ws} />
            <div className="center">
               <Graph graph={graph} options={options} events={events} />
            </div>
            <BattleRightInfo />
         </div>
         <ViewNode
            open={open}
            onClose={handleClose}
            nodeContent={nodeContent}
            ws={ws}
         />
      </>
   )
}
