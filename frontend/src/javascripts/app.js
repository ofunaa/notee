import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'

// notee
import NoteeHeader from './components/layouts/NoteeHeader.react.js'
import NoteeFooter from './components/layouts/NoteeFooter.react.js'

// post
import PostSection from './components/posts/PostSection.react.js'
import PostSectionEdit from './components/posts/PostSectionEdit.react.js'

// category
import CategorySection from './components/categories/CategorySection.react.js'
import CategorySectionEdit from './components/categories/CategorySectionEdit.react.js'

// image
import ImageSection from './components/images/ImageSection.react.js'

// comment
import CommentSection from './components/comments/CommentSection.react.js'

// user
import UserSection from './components/users/UserSection.react.js'
import UserSectionEdit from './components/users/UserSectionEdit.react.js'

// mypage
import MypageSection from './components/mypages/MypageSection.react.js'
import MypageSectionEdit from './components/mypages/MypageSectionEdit.react.js'
import MypageSectionEditPassword from './components/mypages/MypageSectionEditPassword.react.js'

// trash
import TrashSection from './components/trashes/TrashSection.react.js'

// errors
import NotFoundSection from './components/errors/NotFoundSection.react.js'

// common-parts
import NoteeSnackBar from './components/commons/snackbar/NoteeSnackBar.react'

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
            <Route path='new' component={PostSectionEdit} />
            <Route path='edit/:id' component={PostSectionEdit} />
            <IndexRoute component={PostSection}/>
        </Route>

        <Route path='categories'>
            <Route path='edit/:id' component={CategorySectionEdit} />
            <IndexRoute component={CategorySection}/>
        </Route>

        <Route path='comments'>
            <IndexRoute component={CommentSection}/>
        </Route>

        <Route path='images'>
            <IndexRoute component={ImageSection}/>
        </Route>

        <Route path='users'>
            <Route path='new' component={UserSectionEdit} />
            <Route path='edit/:id' component={UserSectionEdit} />
            <IndexRoute component={UserSection}/>
        </Route>

        <Route path='mypage'>
            <Route path='edit' component={MypageSectionEdit} />
            <Route path='edit/password' component={MypageSectionEditPassword} />
            <IndexRoute component={MypageSection}/>
        </Route>

        <Route path='trashes'>
            <Route path=':model' component={TrashSection} />
            <IndexRoute component={TrashSection}/>
        </Route>

        <Route path="*" component={NotFoundSection} />
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
