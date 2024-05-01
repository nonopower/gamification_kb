import React, { useState, useEffect } from 'react'
import {
   Button,
   ButtonGroup,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Divider,
   FormControl,
   FormHelperText,
   TextField,
   InputLabel,
   Box,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { EditorState, ContentState, CompositeDecorator } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { newNode } from '../utils/ideaTool'
import { useDispatch, useSelector } from 'react-redux'
import { setIdea, setPoint } from '../redux/counterSlice'
import axios from 'axios'
import config from './../config.json'
import url from './../url.json'

const scaffold = [
   <Button key="1">【我有個想法】</Button>,
   <Button key="2">【我有另一種想法】</Button>,
   <Button key="3">【我覺得有更好的想法】</Button>,
   <Button key="4">【這個想法不能解釋】</Button>,
   <Button key="5">【結論是… 反思…】</Button>,
   <Button key="6">【我查到的資料是】</Button>,
   <Button key="7">【我查到的範例是】</Button>,
]

const scaffoldWords = [
   '我的想法',
   '我覺得更好的想法',
   '我想知道',
   '這個想法不能解釋',
   '舉例和參考來源',
   '我的總結',
]

const Decorated = ({ children }) => {
   return <span style={{ background: 'red' }}>{children}</span>
}

function findWithRegex(scaffoldWords, contentBlock, callback) {
   const text = contentBlock.getText()

   scaffoldWords.forEach((word) => {
      const regex = new RegExp(word, 'g')
      let match
      while ((match = regex.exec(text)) !== null) {
         callback(match.index, match.index + match[0].length)
      }
   })
}

function handleStrategy(contentBlock, callback) {
   findWithRegex(scaffoldWords, contentBlock, callback)
}

const createDecorator = () =>
   new CompositeDecorator([
      {
         strategy: handleStrategy,
         component: Decorated,
      },
   ])

export const CreateIdea = ({ open, onClose, ws }) => {
   const name = localStorage.getItem('name')
   const [editorState, setEditorState] = useState(
      EditorState.createEmpty(createDecorator()),
   )
   const [isDisabled, setIsDisabled] = useState(true)
   const [loading, setLoading] = useState(false)
   const [content, setContent] = useState()

   const idea = useSelector((state) => state.idea)
   const point = useSelector((state) => state.point)
   const dispatch = useDispatch()

   const nodeDefault = {
      title: '',
      content: '',
      tags: 'idea',
      author: name,
      groupId: localStorage.getItem('groupId'),
   }

   const [data, setData] = useState(nodeDefault)

   const onEditorStateChange = function (editorState) {
      setEditorState(editorState)
      let content = editorState.getCurrentContent().getPlainText('\u0001')
      setData({
         ...data,
         content: content,
      })
      // console.log("content: ", content);
   }

   const handleChange = (e) => {
      const value = e.target.value
      setData({
         ...data,
         [e.target.name]: value,
      })
   }

   const handleButtonClick = (buttonText) => {
      // Concatenate the existing content (or an empty string if it's null) with the buttonText
      const newContent = `${data.content || ''} ${buttonText}`

      setIsDisabled(false)

      // Update the 'content' property in the 'data' state with the new concatenated content
      setData({
         ...data,
         content: newContent,
      })

      // Create a new EditorState with the updated content
      const newEditorState = EditorState.createWithContent(
         ContentState.createFromText(newContent),
         createDecorator(), // Apply the decorator
      )

      // Set the new EditorState in the component state
      setEditorState(newEditorState)
   }

   const updateRadar = async () => {
      try {
         const data = {
            id: localStorage.getItem('userId'),
            idea: idea,
         }
         const callURL = `${url.backendHost}api/radar/updateIdeaScore`

         await axios.post(callURL, data)
      } catch (err) {
         console.error(err)
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      const isTitleValid = data.title.trim().length > 0
      const titleValidLength = data.title.trim().length < 15
      if (
         !isTitleValid ||
         !titleValidLength ||
         !editorState.getCurrentContent().hasText() ||
         !editorState.getCurrentContent().getPlainText().length > 0
      ) {
         return alert(
            '請確定以下項目： \n1. 標題及內容都已輸入\n2. 標題長度不超過15個字',
         )
      }
      const ideaData = {
         title: data.title,
         content: data.content,
         tags: data.tags,
         author: data.author,
         groupId: data.groupId,
      }
      setLoading(true)
      try {
         await newNode(ideaData, localStorage.getItem('activityId'), ws)
         await updateRadar()
         setLoading(false)
         setData(nodeDefault)
         setEditorState(EditorState.createEmpty())
         // redux 更新
         dispatch(setIdea(1))
         dispatch(setPoint(2))
      } catch (error) {
         if (error.response) {
            // console.log(error.response);
            // console.log("server responded");
            setLoading(false)
         } else if (error.request) {
            // console.log("network error");
            setLoading(false)
         } else {
            // console.log(error);
            setLoading(false)
         }
      } finally {
         onClose(onClose)
      }
   }

   return (
      <>
         <Dialog open={open} onClose={onClose} maxWidth="md" scroll="body">
            <DialogTitle>新增想法</DialogTitle>
            <Divider variant="middle" />
            <DialogContent>
               <FormControl variant="standard" fullWidth>
                  <TextField
                     required
                     id="standard-required"
                     autoFocus
                     margin="dense"
                     label={'想法標題'}
                     type="text"
                     name="title"
                     value={data.title}
                     fullWidth
                     variant="standard"
                     onChange={handleChange}
                     inputProps={{ maxLength: 15 }}
                  />
                  <FormHelperText id="component-helper-text">
                     請輸入你的想法標題，讓其他同學能更快速的了解你的想法！
                  </FormHelperText>
               </FormControl>
               <Box
                  sx={{
                     display: 'flex',
                     '& > *': {
                        m: 1,
                     },
                  }}
               >
                  <ButtonGroup
                     orientation="vertical"
                     aria-label="vertical outlined button group"
                     style={{ color: '#ECF2FF' }}
                  >
                     {scaffold.map((button, index) => (
                        <Button
                           key={index}
                           editorState={editorState}
                           onEditorStateChange={onEditorStateChange}
                           onClick={() => {
                              handleButtonClick(button.props.children)
                              // console.log(button.props.children)
                           }}
                        >
                           {button.props.children}
                        </Button>
                     ))}
                  </ButtonGroup>
                  <Editor
                     editorState={editorState}
                     onEditorStateChange={onEditorStateChange}
                     wrapperClassName="wrapper-class"
                     editorClassName="editor-class"
                     toolbarClassName="toolbar-class"
                  />
               </Box>
            </DialogContent>
            <DialogActions>
               <Button onClick={onClose}>取消</Button>
               <LoadingButton
                  disabled={isDisabled}
                  type="submit"
                  onClick={handleSubmit}
                  loading={loading}
                  loadingPosition="start"
                  variant="contained"
               >
                  送出
               </LoadingButton>
            </DialogActions>
         </Dialog>
      </>
   )
}
