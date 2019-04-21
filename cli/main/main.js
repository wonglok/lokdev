import * as Intro from '../parts/intro'
import * as DB from '../parts/db'
import * as Config from '../parts/config'
import * as Service from '../parts/service'
export function cli (argv) {
  Intro.run()
  Config.provideConfig()
    .then((config) => {
      return DB.initDB(config.uidb, config.port)
    })
    .then((db) => {
      Service.init({ db })
    })
}
