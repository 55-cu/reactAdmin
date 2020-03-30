export default {
  root:[
    {
      key:'1',
      title:"首页",
      path:'/admin/home',
      icon:'home'
    },
    {
      key:'2',
      title:"用户",
      icon:'user',
      children:[
        {
          key:'2-1',
          title:'用户列表',
          path:'/admin/user/userlist',
          icon:'list'
        },
        // {
        //   key:'2-2',
        //   title:'添加用户',
        //   path:'/admin/user/add',
        //   icon:'add'
        // },
        // {
        //   key:'2-3',
        //   title:'用户信息修改',
        //   path:'/admin/user/useredit',
        //   icon:'edit'
        // }
      ]
    },
    {
      key:'3',
      title:"热门话题",
      icon:'hot',
      children:[
        {
          key:'3-1',
          title:'热门列表',
          path:'/admin/hot/list',
          icon:'list'
        },
        {
          key:'3-2',
          title:'新建热门',
          path:'/admin/hot/add',
          icon:'add'
        }
      ]
    },
    {
      key:'4',
      title:"数据统计",
      icon:'echarts',
      children:[
        {
          key:'4-1',
          title:'饼图',
          path:'/admin/echarts/pie',
          icon:'pie'
        },
        {
          key:'4-2',
          title:'折线图',
          path:'/admin/echarts/line',
          icon:'line'
        },
        {
          key:'4-3',
          title:'钢琴图',
          path:'/admin/echarts/piano',
          icon:'heat-map'
        }
      ]
    }
  ],
  admin:[
    {
      key:'1',
      title:"首页",
      path:'/admin/home',
      icon:'home'
    },
    {
      key:'2',
      title:"用户",
      icon:'user',
      path: '/admin/user/userlist'
    },
    {
      key:'3',
      title:"热门话题",
      path:'/admin/hot/list',
      icon:'hot'
    },
    {
      key:'4',
      title:"数据统计",
      icon:'echarts',
      path: '/admin/echarts'
    },
  ]
} 
