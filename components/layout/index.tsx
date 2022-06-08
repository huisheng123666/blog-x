import { FC, PropsWithChildren } from 'react'
import NavBar from "components/nav-bar/nav-bar";
import Footer from "components/footer/footer";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <NavBar/>
      <main>{children}</main>
      <Footer/>
    </div>
  )
}

export default Layout