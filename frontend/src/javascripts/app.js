import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'

// notee
import NoteeHeader from './components/layout/NoteeHeader.react.js'
import NoteeFooter from './components/layout/NoteeFooter.react.js'
import PostSection from './components/post/PostSection.react.js'
import PostEdit from './components/post/PostEdit.react.js'
import CategorySection from './components/category/CategorySection.react.js'
import CategoryEdit from './components/category/CategoryEdit.react.js'
import ImageSection from './components/image/ImageSection.react.js'
import CommentSection from './components/comment/CommentSection.react.js'
import UserSection from './components/user/UserSection.react.js'
import UserEdit from './components/user/UserEdit.react.js'
import UserShow from './components/user/UserShow.react.js'
import TrashSection from './components/trash/TrashSection.react.js'

// common-parts
import NoteeSnackBar from './components/common/snackbar/NoteeSnackBar.react'

// material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

injectTapEventPlugin()

export default class NoteeApp extends React.Component {

    render () {
      return (
        <div className='grid_start'>
          <NoteeHeader />
            <div className='ninety grid' style={{margin: '3%', padding: '2%'}}>
              {this.props.children}
            </div>
            <NoteeSnackBar />
          <NoteeFooter />
        </div>
      )
    }
};

const routes = (
    <Route path='notee' component={NoteeApp} >

        <Route path='posts'>
            <Route path='new' component={PostEdit} />
            <Route path='edit/:id' component={PostEdit} />
            <IndexRoute component={PostSection}/>
        </Route>

        <Route path='categories'>
            <Route path='edit/:id' component={CategoryEdit} />
            <IndexRoute component={CategorySection}/>
        </Route>

        <Route path='comments'>
            <IndexRoute component={CommentSection}/>
        </Route>

        <Route path='images'>
            <IndexRoute component={ImageSection}/>
        </Route>

        <Route path='users'>
            <Route path='new' component={UserEdit} />
            <Route path='edit/:id' component={UserEdit} />
            <Route path='show/:id' component={UserShow} />
            <IndexRoute component={UserSection}/>
        </Route>

        <Route path=':model/trash' component={TrashSection} />
        
        <IndexRoute component={PostSection}/>
    </Route>
)

window.onload = function () {
  ReactDOM.render(
    <MuiThemeProvider>
      <Router history={browserHistory} routes={routes} />
    </MuiThemeProvider>,
    document.getElementById('react')
  )
}
