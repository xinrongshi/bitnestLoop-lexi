import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconUserSearch,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "我的邀请",
    icon: IconAperture,
    href: "/",
  },
 
  {
    navlabel: true,
    subheader: "Utilities",
  },
  {
    id: uniqueId(),
    title: "数据统计",
    icon: IconLayoutDashboard,
    href: "/static",
  },
  {
    id: uniqueId(),
    title: "数据图表",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    id: uniqueId(),
    title: "人员管理",
    icon: IconTypography,
    href: "/admins",
  }, 
  {
    id: uniqueId(),
    title: "付款记录",
    icon: IconTypography,
    href: "/records",
  },
  {
    id: uniqueId(),
    title: "邀请管理",
    icon: IconTypography,
    href: "/referrals",
  },
  {
    id: uniqueId(),
    title: "用户管理",
    icon: IconUserSearch,
    href: "/users",
  },
  // {
  //   id: uniqueId(),
  //   title: "Typography",
  //   icon: IconTypography,
  //   href: "/utilities/typography",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Shadow",
  //   icon: IconCopy,
  //   href: "/utilities/shadow",
  // },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "登录",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "注册",
    icon: IconUserPlus,
    href: "/authentication/register",
  },
  // {
  //   navlabel: true,
  //   subheader: "Extra",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Icons",
  //   icon: IconMoodHappy,
  //   href: "/icons",
  // },

];

export default Menuitems;
