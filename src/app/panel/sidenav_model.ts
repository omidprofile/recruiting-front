export class Sidenav_model{
  items:any[] = [
    {
      icon: 'dashboard',
      title:'داشبورد',
      route:'/panel',
      tooltip:'خلاصه فعالیت'
    },
    {
      icon: 'shopping_cart',
      title:'سفارشات',
      route:'orders/current',
      tooltip:'سفارش های تایید شده'
    },
    {
      icon: 'add_shopping_cart',
      title:'سفارش جدید',
      route:'orders/create',
      tooltip:'ایجاد سفارش جدید'
    },
/*    {
      icon: 'local_mall',
      title:'محصولات'
    },*/
    {
      icon: 'account_balance',
      title:'مالی',
      route:'financial',
      tooltip:'قیمت ها،صورتحساب ها و فاکتورها '
    },


  ]
}

