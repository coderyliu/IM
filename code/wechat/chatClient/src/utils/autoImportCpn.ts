/**
 * description：按需引入组件
 * auth：coderyliu
 */
import { ElButton } from 'element-plus'

const cpnList = [ElButton]

const autoImportCpn = (app: any) => {
  for (const cpn of cpnList) {
    app.component(cpn)
  }
}

export default autoImportCpn
