import {FC, useCallback, useState} from "react";
import styles from './nav-bar.module.scss'
import { navs } from "./config";
import Link from 'next/link'
import { useRouter } from 'next/router'
import {Button} from "antd";
import Login from "../login/login";

const NavBar: FC = () => {
  const router = useRouter()

  const [isShowLogin, setIsShowLogin] = useState(false)

  const handleGotoEditorPage = useCallback(() => {
  }, [])

  const handleLogin = useCallback(() => {
    setIsShowLogin(true)
  }, [])

  const handleCloseLogin = useCallback(() => {
    setIsShowLogin(false)
  }, [])

  return (
    <div className={styles.navbar}>
      <section className="logo-area">BLOG-X</section>
      <section className="link-area">
        {
          navs?.map(nav => {
            return <Link key={nav.value} href={nav.value}>
              <a className={router.asPath === nav.value ? 'link active' : 'link'}>{nav.label}</a>
            </Link>
          })
        }
      </section>
      <section className="operation-area">
        <Button size="middle" onClick={handleGotoEditorPage}>写文章</Button>
        <Button size="middle" type="primary" onClick={handleLogin}>登陆</Button>
      </section>
      <Login isShow={isShowLogin} handleClose={handleCloseLogin} />
    </div>
  )
}

export default NavBar