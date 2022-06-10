import "reflect-metadata"
import { DataSource } from "typeorm";
import { User, UserAuth } from "./entity/user";

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'blog_x',
  synchronize: true,
  logging: true,
  entities: [User, UserAuth]
})

AppDataSource.initialize()
  .then((dataSource) => {
    console.log(dataSource)
  })
  .catch((err) => {
    console.error(`数据库链接失败：${err}`)
  })

export default AppDataSource;