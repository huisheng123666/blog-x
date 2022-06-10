import {NextApiRequest, NextApiResponse} from "next";
import { withIronSessionApiRoute } from 'iron-session/next'
import {ironOptions} from "config";
import { ISession } from '../index'

export default withIronSessionApiRoute(sendVerifyCode, ironOptions)

async function sendVerifyCode(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = req.session as ISession
  const verifyCode = parseInt((Math.random() * 10000).toString())
  session.verifyCode = verifyCode.toString()
  await session.save()
  res.status(200).json({
    code: 0,
    data: verifyCode
  })
}