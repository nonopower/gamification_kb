import React, { useState, useEffect, useCallback } from 'react'
import { CreateIdea } from '../CreateIdea'
import { CreateQuestion } from '../CreateQuestion'
import { CreateInformation } from '../CreateInformation'
import { CreateFlask } from '../CreateFlask'
import { CreateNote } from '../CreateNote'
import { useNavigate } from 'react-router-dom'
import config from '../../config.json'
import url from '../../url.json'
import axios from 'axios'

export default function SideMenu({ ws }) {
   const navigate = useNavigate()
   const [selectedModal, setSelectedModal] = useState(null)
   // const [activityData, setActivityData] = useState(null)

   const openModal = useCallback((modalKey, e) => {
      e.preventDefault()
      setSelectedModal(modalKey)
   }, [])

   const closeModal = useCallback((e) => {
      e.preventDefault()
      setSelectedModal(null)
   }, [])

   // useEffect(() => {
   //    const getActivityData = async () => {
   //      try {
   //        const response = await axios.get(`${url.backendHost + config[6].enterActivity}/${localStorage.getItem('activityId')}`);
   //        setActivityData(response.data);
   //      } catch (err) {
   //        // console.log(err);
   //      }
   //    };

   //    getActivityData();
   //  }, []);

   return (
      <>
         <div className="side-menu">
            <div className="menu-list">
               <div className="menu-item" onClick={() => navigate(-1)} />
               <div
                  className="menu-item"
                  onClick={(e) => openModal('createIdea', e)}
               />
               <div
                  className="menu-item"
                  onClick={(e) => openModal('createQuestion', e)}
               />
               <div
                  className="menu-item"
                  onClick={(e) => openModal('createInformation', e)}
               />
               <div
                  className="menu-item"
                  onClick={(e) => openModal('createFlask', e)}
               />
               <div
                  className="menu-item"
                  onClick={(e) => openModal('createNote', e)}
               />
            </div>
         </div>
         {selectedModal === 'createIdea' && (
            <CreateIdea open={openModal} onClose={closeModal} ws={ws} />
         )}
         {selectedModal === 'createQuestion' && (
            <CreateQuestion open={openModal} onClose={closeModal} ws={ws} />
         )}
         {selectedModal === 'createInformation' && (
            <CreateInformation open={openModal} onClose={closeModal} ws={ws} />
         )}
         {selectedModal === 'createFlask' && (
            <CreateFlask open={openModal} onClose={closeModal} ws={ws} />
         )}
         {selectedModal === 'createNote' && (
            <CreateNote open={openModal} onClose={closeModal} ws={ws} />
         )}
      </>
   )
}
