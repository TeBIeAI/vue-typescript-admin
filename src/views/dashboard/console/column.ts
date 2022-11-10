import { ElImage } from 'element-plus'
import { h } from 'vue'
import { ColumnProps } from '/#/table'

// 表格配置项
export const columns: ColumnProps[] = [
  {
    prop: 'index',
    label: 'No',
    width: 80,
    formatter: function (a, i, c, d) {
      return d
    }
  },
  {
    prop: 'username',
    label: '用户姓名',
    edit: true,
    width: 130
  },

  // 😄 enum 可以直接是数组对象，也可以是请求方法(proTable 内部会执行获取 enum 的这个方法)，下面用户状态也同理
  // 😄 enum 为请求方法时，后台返回的数组对象 key 值不是 label 和 value 的情况，可以在 searchProps 中指定 label 和 value 的 key 值
  {
    prop: 'gender',
    label: '性别',
    width: 120,
    sortable: true,
    render: 'tag',
    custom: { 1: 'success', 2: 'danger' },
    replaceValue: { 1: '男', 2: '女' }
  },
  {
    prop: 'avatar',
    label: '图片',
    width: 120,
    formatter: function (a, b, c) {
      return h(ElImage, {
        size: 50,
        src: c
      })
    }
  },
  {
    prop: 'idCard',
    label: '身份证号'
  },
  { prop: 'email', label: '邮箱' },
  { prop: 'address', label: '居住地址' },
  {
    prop: 'status',
    label: '用户状态',
    sortable: true,
    render: 'switch'
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 200,
    sortable: true
  }
]

export const tableData = {
  code: 200,
  msg: '成功',
  data: {
    datalist: [
      {
        id: '73649534945732221566',
        username: '崔军',
        gender: 1,
        age: 26,
        idCard: '73649534945732221566',
        email: 'b.ghsvvmd@rtdqkurp.ki',
        address: '甘肃省 甘南藏族自治州',
        createTime: '1999-01-01 12:38:46',
        status: 1,
        avatar: 'http://dummyimage.com/400x400/79f28b/f2798a&text=Jason'
      },
      {
        id: '84077592780415390863',
        username: '蒋涛',
        age: 19,
        idCard: '84077592780415390863',
        email: 'y.ftcj@nkuwvkx.va',
        address: '江西省 九江市',
        createTime: '1970-01-08 20:10:09',
        status: 0,
        avatar: 'http://dummyimage.com/400x400/79f28b/f2798a&text=Jason'
      },
      {
        id: '36311658441751014506',
        username: '易刚',
        gender: 1,
        age: 28,
        idCard: '36311658441751014506',
        email: 'e.esii@ensteidpvj.kr',
        address: '河南省 许昌市',
        createTime: '1976-07-14 00:45:17',
        status: 0,
        avatar: 'http://dummyimage.com/400x400/79f28b/f2798a&text=Jason'
      },
      {
        id: '12579365764122448282',
        username: '程霞',
        gender: 1,
        age: 24,
        idCard: '12579365764122448282',
        email: 'b.vevinti@fwdeld.bn',
        address: '甘肃省 武威市',
        createTime: '2008-07-27 21:53:58',
        status: 0,
        avatar: 'http://dummyimage.com/400x400/79f28b/f2798a&text=Jason'
      },
      {
        id: '85110831684265817744',
        username: '朱刚',
        gender: 2,
        age: 27,
        idCard: '85110831684265817744',
        email: 'u.jyjjtnfvx@utqjyp.lr',
        address: '重庆 重庆市',
        createTime: '1982-06-06 05:26:27',
        status: 1,
        avatar: 'http://dummyimage.com/400x400/79f28b/f2798a&text=Jason'
      },
      {
        id: '75732177066757782143',
        username: '廖芳',
        gender: 2,
        age: 28,
        idCard: '75732177066757782143',
        email: 'n.psbhry@wolgytwb.ge',
        address: '西藏自治区 昌都地区',
        createTime: '1998-04-24 02:58:34',
        status: 1,
        avatar: 'http://dummyimage.com/400x400/79f28b/f2798a&text=Jason'
      },
      {
        id: '84598383763973132852',
        username: '范明',
        gender: 1,
        age: 27,
        idCard: '84598383763973132852',
        email: 'a.uddcks@bpxnwweux.dm',
        address: '陕西省 宝鸡市',
        createTime: '1984-11-17 08:53:44',
        status: 0,
        avatar: 'http://dummyimage.com/400x400/79f28b/f2798a&text=Jason'
      },
      {
        id: '36263609473284189507',
        username: '张娟',
        gender: 2,
        age: 16,
        idCard: '36263609473284189507',
        email: 'i.dougkyixop@ediv.name',
        address: '海南省 三亚市',
        createTime: '1989-10-02 01:38:38',
        status: 1,
        avatar: 'http://dummyimage.com/400x400/79f28b/f2798a&text=Jason'
      },
      {
        id: '98545197779673132432',
        username: '秦平',
        gender: 1,
        age: 20,
        idCard: '98545197779673132432',
        email: 'y.nxwfey@kkyemngo.gi',
        address: '辽宁省 锦州市',
        createTime: '2014-10-24 12:02:49',
        status: 0,
        avatar: 'http://dummyimage.com/400x400/79f28b/f2798a&text=Jason'
      },
      {
        id: '87568941884702415898',
        username: '廖平',
        gender: 2,
        age: 17,
        idCard: '87568941884702415898',
        email: 'h.nyhhbw@ykobionsl.sr',
        address: '福建省 厦门市',
        createTime: '1983-04-21 20:32:40',
        status: 0,
        avatar: 'http://dummyimage.com/400x400/79f28b/f2798a&text=Jason'
      }
    ],
    pageNum: 1,
    pageSize: 10,
    total: 2000
  }
}
