import { createBrowserRouter } from 'react-router'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { FinallyRegister } from './pages/auth/finally-register'
import { Home } from './pages/app/home'
import { TeacherList } from './pages/app/teacher-list'
import { TeacherForm } from './pages/teacher/teacher-form'
import { TeacherSuccess } from './pages/teacher/teacher-success'
import { TeacherProfile } from './pages/teacher/teacher-profile'

export const router = createBrowserRouter([
    { path: '/sign-in', element: <SignIn /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '/sign-up/finally-register', element: <FinallyRegister /> },
    { path: '/', element: <Home /> },
    { path: '/study', element: <TeacherList />},
    { path: '/give-classes', element: <TeacherForm /> },
    { path: '/give-classes/success', element: <TeacherSuccess /> },
    { path: '/profile', element: <TeacherProfile /> }
])