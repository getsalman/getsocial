import React, { useReducer, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'
import { CSSTransition } from 'react-transition-group'
import './App.css'
import Axios from 'axios'
import Header from './components/Header'
import HomeGuest from './components/HomeGuest'
import Home from './components/Home'
import Footer from './components/Footer'
import About from './components/About'
import Terms from './components/Terms'
import CreatePost from './components/CreatePost'
import ViewSinglePost from './components/ViewSinglePost'
import FlashMessages from './components/FlashMessages'
import StateContext from './StateContext'
import DispatchContext from './DispatchContext'
import Profile from './components/Profile'
import EditPost from './components/EditPost'
import NotFound from './components/NotFound'
import Search from './components/Search'
import Chat from './components/Chat'

Axios.defaults.baseURL =
  process.env.BACKENDURL || 'https://getsocialpost.herokuapp.com'

const App = () => {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem('socialappToken')),
    flashMessages: [],
    user: {
      token: localStorage.getItem('socialappToken'),
      username: localStorage.getItem('socialappUsername'),
      avatar: localStorage.getItem('socialappAvatar')
    },
    isSearchOpen: false,
    isChatOpen: false,
    unreadChatCount: 0
  }

  const OurReducer = (draft, action) => {
    switch (action.type) {
      case 'login':
        draft.loggedIn = true
        draft.user = action.data
        return
      case 'logout':
        draft.loggedIn = false
        return
      case 'flashMessage':
        draft.flashMessages.push(action.value)
        return
      case 'openSearch':
        draft.isSearchOpen = true
        return
      case 'closeSearch':
        draft.isSearchOpen = false
        return
      case 'toggleChat':
        draft.isChatOpen = !draft.isChatOpen
        return
      case 'closeChat':
        draft.isChatOpen = false
        return
      case 'incrementUnreadChatCount':
        draft.unreadChatCount++
        return
      case 'clearUnreadChatCount':
        draft.unreadChatCount = 0
        return
    }
  }

  const [state, dispatch] = useImmerReducer(OurReducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem('socialappToken', state.user.token) //the first argument is the name of data that we want to store, and the second argument is the value
      localStorage.setItem('socialappUsername', state.user.username)
      localStorage.setItem('socialappAvatar', state.user.avatar)
    } else {
      localStorage.removeItem('socialappToken') //the first argument is the name of data that we want to store, and the second argument is the value
      localStorage.removeItem('socialappUsername')
      localStorage.removeItem('socialappAvatar')
    }
  }, [state.loggedIn])

  //Check if token has expired or not on first render

  useEffect(() => {
    if (state.loggedIn) {
      const ourRequest = Axios.CancelToken.source()
      async function fetchResult () {
        try {
          const response = await Axios.post(
            '/checkToken',
            { token: state.user.token },
            { cancelToken: ourRequest.token }
          )
          if (!response.data) {
            dispatch({ type: 'logout' })
            dispatch({
              type: 'flashMessage',
              value: 'Your session has expired. Please login again.'
            })
          }
          console.log(response.data)
        } catch (error) {
          console.log('There was a problem')
        }
      }
      fetchResult()
      return () => ourRequest.cancel()
    }
  }, [])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Router>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Switch>
            <Route path='/profile/:username'>
              <Profile />
            </Route>
            <Route exact path='/'>
              {state.loggedIn ? <Home /> : <HomeGuest />}
            </Route>
            <Route exact path='/post/:id'>
              <ViewSinglePost />
            </Route>
            <Route exact path='/post/:id/edit'>
              <EditPost />
            </Route>
            <Route exact path='/create-post'>
              <CreatePost />
            </Route>
            <Route exact path='/about-us' component={About} />
            <Route exact path='/terms' component={Terms} />
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <CSSTransition
            timeout={330}
            in={state.isSearchOpen}
            classNames='search-overlay'
            unmountOnExit
          >
            <Search />
          </CSSTransition>
          <Chat />
          <Footer />
        </Router>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default App
