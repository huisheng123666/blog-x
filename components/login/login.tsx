import {ChangeEvent, EventHandler, FC, useCallback, useState} from "react";
import { createPortal } from 'react-dom'
import styles from './login.module.scss'
import {CloseOutlined} from "@ant-design/icons";
import {Button, message} from "antd";
import CountDown from "../count-down/count-down";
import request from "../../service/fetch";

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
    if (!form.phone) {
      return message.error('请输入手机号')
    }
    request.post('/api/user/sendVerifyCode', form)
      .then(() => {
        setIsShowVerifyCode(true)
      })
  }, [form])

  const handleLogin = useCallback(() => {
    request.post('/api/user/login', {
      ...form
    })
      .then((res: any) => {
        if (res.code === 0) {
          handleClose()
        } else {
          message.error('登陆失败')
        }
      })
  }, [form, handleClose])

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

  const close = useCallback(() => {
    setIsShowVerifyCode(false)
    handleClose()
  }, [handleClose])
  
  return isShow ? createPortal(<div className={styles.login}>
    <div className="login-box">
      <div className="login-title">
        <span>手机号登陆</span>
        <CloseOutlined onClick={close} />
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
        >{isShowVerifyCode ? <CountDown time={60} onEnd={handleCountDownEnd} /> : '获取验证码'}</Button>
      </div>
      <Button className="login-btn" onClick={handleLogin} type="primary" block>登陆</Button>
      <Button block onClick={handleOAuthGithub}>使用github登陆</Button>
    </div>
  </div>, document.body) : null
}

export default Login