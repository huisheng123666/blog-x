import {NextApiRequest, NextApiResponse} from "next";
import { withIronSessionApiRoute } from 'iron-session/next'
import {ironOptions} from "config";
import { ISession } from '../index'

export default withIronSessionApiRoute(login, ironOptions)

async function login(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { phone, verify } = req.body
  const session = req.session as ISession
  session.destroy()
  res.status(200).json({
    code: verify === session.verifyCode ? 0 : -1,
    data: session.verifyCode
  })
}