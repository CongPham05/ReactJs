export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'
            // }
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },

        ]
    },
    { //Quản lý Phong Kham
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },

        ]
    },
    { //Quản lý Chuyên Khoa
        name: 'menu.admin.speciality',
        menus: [
            {
                name: 'menu.admin.manage-speciality', link: '/system/manage-specialty'
            },

        ]
    },
    { //Quản lý cẩm Nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            },

        ]
    },
];

export const doctorMenu = [
    { //Quản lý bac si
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
        ]
    },
];