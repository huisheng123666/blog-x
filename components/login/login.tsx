import {ChangeEvent, EventHandler, FC, useCallback, useState} from "react";
import { createPortal } from 'react-dom'
import styles from './login.module.scss'
import {CloseOutlined} from "@ant-design/icons";
import {Button} from "antd";
import CountDown from "../count-down/count-down";

interface LoginProps {
  isShow: boolean
  handleClose: () => void
}

const Login: FC<LoginProps> = ({ isShow, handleClose }) => {
  const [form, setForm] = useState({
    phone: '',
    verify: ''
  })

  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false)

  const handleGetVerifyCode = useCallback(() => {
    setIsShowVerifyCode(true)
  }, [])

  const handleLogin = useCallback(() => {}, [])

  const handleOAuthGithub = useCallback(() => {}, [])

  const handleFormChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e?.target
    setForm({
      ...form,
      [name]: value
    })
  }, [form])

  const handleCountDownEnd = useCallback(() => {
    setIsShowVerifyCode(false)
  }, [])
  
  return isShow ? createPortal(<div className={styles.login}>
    <div className="login-box">
      <div className="login-title">
        <span>手机号登陆</span>
        <CloseOutlined onClick={handleClose} />
      </div>
      <input
        type="text"
        name="phone"
        value={form.phone}
        placeholder="请输入手机号"
        onChange={handleFormChange}
      />
      <div className="verify-code">
        <input
          type="text"
          name="verify"
          value={form.verify}
          placeholder="请输入验证码"
          onChange={handleFormChange}
          style={{marginBottom: 0}}
        />
        <Button
          className="send-btn"
          size="small"
          type="text"
          onClick={handleGetVerifyCode}
          disabled={isShowVerifyCode}
        >{isShowVerifyCode ? <CountDown time={10} onEnd={handleCountDownEnd} /> : '获取验证码'}</Button>
      </div>
      <Button className="login-btn" onClick={handleLogin} type="primary" block>登陆</Button>
      <Button block onClick={handleOAuthGithub}>使用github登陆</Button>
    </div>
  </div>, document.body) : null
}

export default Login