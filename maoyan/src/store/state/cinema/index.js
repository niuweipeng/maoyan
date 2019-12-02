export  default{
    cinema:[],
    offset:0,//页数，跳过多少条
    subItems:[],
    allCityShow:false,//判断点击全城等时，组件是否显示
    allBrandShow:false,//判断点击品牌等时，组件是否显示
    allCharacterShow:false,//判断点击特色等时，组件是否显示
    subItemsId:"",//点击左边拿到Id显示右边的列表
    brand:[],//所有的品牌列表
    hallType:[],//所有的特殊厅
    service:[],//所有的特色服务
    typeNum:1,//标志点击的是南区(1)还是地铁站(2)
    detaiCitylName:"",//全城箭头左侧文字显示
    detaiBrandName:"",//品牌箭头左侧文字显示
    characterColor:false,//标题特色名称的颜色,不显示红色（）
}