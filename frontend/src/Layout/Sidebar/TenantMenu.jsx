import { Airplay, BarChart, Box, MessageCircle, CheckSquare, Clock, Cloud, Command, Edit, FileText, Film, FolderPlus, GitPullRequest, Heart, HelpCircle, Home, Image, Layers, List, Mail, Map, Package, Radio, Server, Sunrise, Users, Zap, ShoppingBag, Search } from "react-feather";

export const TenantMENU = (slug) => [
  {
    className: "menu-box",
    menu: [
      {
        title: "Dashboard",
        icon: <Home />,
        url: `/${slug}/dashboard/default`,
        class: "lan-3",
        type: "link",
      },
      
      {
        title: "Categories",
        icon: <Layers />,
        type: "sub",
        menu: [
          {
            url: `/${slug}/category/categorylist`,
            title: "Manage Categories",
            type: "link",
          },
          {
            url: `/${slug}/category/categoryorder`,
            title: "Categories Order",
            type: "link",
          },
        ],
      },

      {
        title: "Sub Categories",
        icon: <Home />,
        class: "lan-3",
        menu: [
          {
            title: "Manage Sub Categories",
            url: `/${slug}/subcategory/subcategorylist`,
            class: "lan-4",
            type: "link",
          },
        ],
      },

      {
        url: `/${slug}/brand`,
        icon: <Heart />,
        bookmark: true,
        type: "link",
        title: "Brands",
      },

      {
        url: `/${slug}/productRating`,
        icon: <Zap />,
        title: "Product Rating",
        type: "link",
        bookmark: true,
      },

      {
        url: `/${slug}/deliveryMethod`,
        icon: <List />,
        type: "link",
        title: "Delivery Method",
      },


      {
        title: "Products",
        icon: <ShoppingBag />,
        type: "sub",
        menu: [
          {
            url: `/${slug}/product/add-product`,
            title: "Add Product",
            type: "link",
          },
          {
            url: `/${slug}/product/product-list`,
            title: "Product List",
            type: "link",
          },
          {
            url: `/${slug}/product/productOrders`,
            title: "product Orders",
            type: "link",
          },
          {
            url: `/${slug}/product/bulk-edit-product`,
            title: "Bulk Edit Product",
            type: "link",
          },


        ],
      },


      {
        url: `/${slug}/hameBanner`,
        icon: <Airplay />,
        type: "link",
        title: "Hame banner",
      },

      {
        url: `/${slug}/offerBanner`,
        icon: <Film />,
        type: "link",
        title: "Offers banner",
      },

      {
        url: `/${slug}/promoCode`,
        icon: <Zap />,
        type: "link",
        title: "Promo Code",
      },

      {
        url: `/${slug}/featuredSection`,
        icon: <Zap />,
        type: "link",
        title: "Featured Sections",
      },




      {
        title: "Customers",
        icon: <Users />,
        type: "sub",
        menu: [
          {
            url: `/${slug}/customer/customerList`,
            title: "Customer List",
            type: "link",
          },
          {
            url: `/${slug}/customer/manage-customer-wallet`,
            title: "Customer Wallet",
            type: "link",
          },
          {
            url: `/${slug}/customer/loyaltypoint`,
            title: "Loyalty Point",
            type: "link",
          },
          {
            url: `/${slug}/customer/customer-refferal-report`,
            title: "Customer Referral Report",
            type: "link",
          },

        ],
      },
      

      {
        url: `/${slug}/returnRequests`,
        icon: <Airplay />,
        type: "link",
        title: "Return Requests",
      },

      {
        title: "Delivery Boys",
        icon: <Users />,
        type: "sub",
        menu: [
          {
            url: `/${slug}/deliveryboy/delivery-boys-list`,
            title: "Delivery Boys List",
            type: "link",
          },
          {
            url: `/${slug}/deliveryboy/fund-transfers`,
            title: "Fund Transfer",
            type: "link",
          },

        ],
      },

      {
        url: `/${slug}/notification`,
        icon: <Radio />,
        type: "link",
        title: "Notifications",
      },

      {
        url: `/${slug}/transaction`,
        icon: <MessageCircle />,
        type: "link",
        title: "Transactions",
      },

      {
        url: `/${slug}/wallet-transactions`,
        icon: <GitPullRequest />,
        type: "link",
        title: "Wallet Transactions",
      },
















      // {
      //   title: "Widgets",
      //   icon: <Airplay />,
      //   class: "lan-6",
      //   menu: [
      //     {
      //       url: `/widgets/general`,
      //       type: "link",
      //       title: "General",
      //     },
      //     {
      //       url: `/widgets/chart`,
      //       type: "link",
      //       title: "Chart",
      //     },
      //   ],
      // },
      
      
    ],
  },



  
  // {
  //   className: "menu-box",
  //   menu: [
  //     {
  //       title: "Chat",
  //       icon: <MessageCircle />,
  //       menu: [
  //         {
  //           url: `/chat-app`,
  //           type: "link",
  //           title: "Chat App",
  //         },
  //         {
  //           url: `/video-chat-app`,
  //           type: "link",
  //           title: "Video App",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Users",
  //       icon: <Users />,
  //       menu: [
  //         {
  //           url: `/users/user-profile`,
  //           type: "link",
  //           title: "User Profile",
  //         },
  //         {
  //           url: `/users/user-edit`,
  //           type: "link",
  //           title: "Users Edit",
  //         },
  //         {
  //           url: `/users/user-cards`,
  //           type: "link",
  //           title: "User Cards",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Email",
  //       icon: <Mail />,
  //       menu: [
  //         {
  //           url: `/email-app`,
  //           type: "link",
  //           title: "Mail Inbox",
  //         },
  //         {
  //           url: `/email-app/read-mail`,
  //           type: "link",
  //           title: "Read Mail",
  //         },
  //         {
  //           url: `/email-app/compose`,
  //           type: "link",
  //           title: "Compose",
  //         },
  //       ],
  //     },
  //     {
  //       url: `/file-manager`,
  //       icon: <GitPullRequest />,
  //       title: "File Manager",
  //       type: "link",
  //       bookmark: true,
  //     },
  //     {
  //       url: `/bookmark`,
  //       icon: <Heart />,
  //       bookmark: true,
  //       type: "link",
  //       title: "Bookmark",
  //     },
  //     {
  //       url: `/contact`,
  //       icon: <List />,
  //       type: "link",
  //       title: "Contacts",
  //     },
  //     {
  //       url: `/task`,
  //       icon: <CheckSquare />,
  //       type: "link",
  //       title: "Task",
  //     },
  //     {
  //       url: `/social-app`,
  //       icon: <Zap />,
  //       title: "Social App",
  //       type: "link",
  //       bookmark: true,
  //     },
  //     {
  //       url: `/search-result`,
  //       icon: <Search />,
  //       type: "link",
  //       title: "Search Result",
  //     },
  //     {
  //       url: `/todo-app/todo`,
  //       icon: <Clock />,
  //       type: "link",
  //       title: "To-Do",
  //     },
  //   ],
  // },

  
  // {
  //   className: "menu-box",
  //   menu: [
  //     {
  //       title: "Forms",
  //       icon: <FileText />,
  //       menu: [
  //         {
  //           title: "Form Controls",
  //           menu: [
  //             {
  //               title: "Form Validation",
  //               type: "link",
  //               url: `/forms/form-validation`,
  //             },
  //             {
  //               title: "Basic Input",
  //               type: "link",
  //               url: `/forms/baseInput`,
  //             },
  //             {
  //               title: "Checkbox & Radio",
  //               type: "link",
  //               url: `/forms/radio-checkbox`,
  //             },
  //             {
  //               title: "Input Groups",
  //               type: "link",
  //               url: `/forms/input-group`,
  //             },
  //             {
  //               title: "Mega Option",
  //               type: "link",
  //               url: `/forms/mega-options`,
  //             },
  //           ],
  //         },
  //         {
  //           title: "Form Widgets",
  //           menu: [
  //             {
  //               title: "Datepicker",
  //               type: "link",

  //               url: `/form-widget/datepicker`,
  //             },
  //             {
  //               title: "Typeahead",
  //               type: "link",

  //               url: `/form-widget/typeahead`,
  //             },
  //             {
  //               title: "Rangepicker",
  //               type: "link",

  //               url: `/form-widget/rangepicker`,
  //             },
  //             {
  //               title: "Touchspin",
  //               type: "link",

  //               url: `/form-widget/touchspin`,
  //             },
  //             {
  //               title: "Select2",
  //               type: "link",

  //               url: `/form-widget/select`,
  //             },
  //             {
  //               title: "Switch",
  //               type: "link",

  //               url: `/form-widget/switch`,
  //             },
  //             {
  //               title: "Clipboard",
  //               type: "link",

  //               url: `/form-widget/clipboard`,
  //             },
  //           ],
  //         },
  //         {
  //           title: "Form Layout",
  //           menu: [
  //             {
  //               url: `/form-layout/form-default`,
  //               type: "link",
  //               title: "Form Default",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       title: "Tables",
  //       icon: <Server />,
  //       menu: [
  //         {
  //           title: "React Strap Table",
  //           url: `/table/reactstrap-table`,
  //           type: "link",
  //         },
  //         {
  //           title: "Data Tables",
  //           type: "link",
  //           url: `/table/datatable`,
  //         },
  //       ],
  //     },
  //   ],
  // },



  // {
  //   className: "menu-box",
  //   menu: [
  //     {
  //       title: "Ui-Kits",
  //       icon: <Box />,
  //       menu: [
  //         {
  //           url: `/ui-kits/typography`,
  //           title: "Typography",
  //           type: "link",
  //         },
  //         {
  //           url: `/ui-kits/avatar`,
  //           title: "Avatars",
  //           type: "link",
  //         },
  //         {
  //           url: `/ui-kits/helperclass`,
  //           title: "Helper-Classes",
  //           type: "link",
  //         },
  //         {
  //           url: `/ui-kits/grid`,
  //           title: "Grid",
  //           type: "link",
  //         },
  //         {
  //           url: `/ui-kits/tagsandpills`,
  //           title: "Tag & Pills",
  //           type: "link",
  //         },
  //         {
  //           url: `/ui-kits/progress-bar`,
  //           title: "Progress",
  //           type: "link",
  //         },
  //         {
  //           url: `/ui-kits/modal`,
  //           title: "Modal",
  //           type: "link",
  //         },
  //         {
  //           url: `/ui-kits/alert`,
  //           title: "Alert",
  //           type: "link",
  //         },
  //         {
  //           url: `/ui-kits/popover`,
  //           title: "Popover",
  //           type: "link",
  //         },
  //         {
  //           url: `/ui-kits/tooltips`,
  //           title: "Tooltip",
  //           type: "link",
  //         },
  //         {
  //           url: `/ui-kits/spinner`,
  //           title: "Spinners",
  //           type: "link",
  //         },
  //         {
  //           url: `/ui-kits/dropdown`,
  //           title: "Dropdown",
  //           type: "link",
  //         },
  //         {
  //           url: `/ui-kits/accordion`,
  //           title: "Accordion",
  //           type: "link",
  //         },
  //         {
  //           title: "Tabs",
  //           type: "sub",
  //           menu: [
  //             {
  //               title: "Bootstrap Tabs",
  //               type: "link",
  //               url: `/ui-kits/tab-bootstrap`,
  //             },
  //             {
  //               title: "Line Tabs",
  //               type: "link",
  //               url: `/ui-kits/tab-line`,
  //             },
  //           ],
  //         },
  //         {
  //           url: `/ui-kits/shadow`,
  //           title: "Shadow",
  //           type: "link",
  //         },
  //         {
  //           url: `/ui-kits/list`,
  //           title: "List",
  //           type: "link",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Bonus Ui",
  //       type: "sub",
  //       icon: <FolderPlus />,
  //       menu: [
  //         {
  //           url: `/bonus-ui/scrollable`,
  //           type: "link",
  //           title: "Scrollable",
  //         },
  //         {
  //           url: `/bonus-ui/treeview`,
  //           type: "link",
  //           title: "Tree",
  //         },
  //         {
  //           url: `/bonus-ui/rating`,
  //           type: "link",
  //           title: "Rating",
  //         },
  //         {
  //           url: `/bonus-ui/carousel`,
  //           type: "link",
  //           title: "Carousel",
  //         },
  //         {
  //           url: `/bonus-ui/dropzone`,
  //           type: "link",
  //           title: "Dropzone",
  //         },
  //         {
  //           url: `/bonus-ui/tour`,
  //           type: "link",
  //           title: "Tour",
  //         },
  //         {
  //           url: `/bonus-ui/sweet-alert`,
  //           type: "link",
  //           title: "SweetAlert",
  //         },
  //         {
  //           url: `/bonus-ui/ribbons`,
  //           type: "link",
  //           title: "Ribbons",
  //         },
  //         {
  //           url: `/bonus-ui/pagination`,
  //           type: "link",
  //           title: "Pagination",
  //         },
  //         {
  //           url: `/bonus-ui/breadcrumb`,
  //           type: "link",
  //           title: "Breadcrumb",
  //         },
  //         {
  //           url: `/bonus-ui/range-slider`,
  //           type: "link",
  //           title: "Range Slider",
  //         },
  //         {
  //           url: `/bonus-ui/image-cropper`,
  //           type: "link",
  //           title: "Image Cropper",
  //         },
  //         {
  //           url: `/bonus-ui/sticky-notes`,
  //           type: "link",
  //           title: "Sticky",
  //         },
  //         {
  //           url: `/bonus-ui/drag-and-drop`,
  //           type: "link",
  //           title: "Drag and Drop",
  //         },
  //         {
  //           url: `/bonus-ui/image-upload`,
  //           type: "link",
  //           title: "Upload",
  //         },
  //         {
  //           url: `/bonus-ui/basic-cards`,
  //           type: "link",
  //           title: "Basic Card",
  //         },
  //         {
  //           url: `/bonus-ui/timeline`,
  //           type: "link",
  //           title: "Timeline",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Icons",
  //       icon: <Command />,
  //       type: "sub",
  //       menu: [
  //         {
  //           url: `/icons/flag-icons`,
  //           type: "link",
  //           title: "Flag Icon",
  //         },
  //         {
  //           url: `/icons/font-awsome-icon`,
  //           type: "link",
  //           title: "Font awesome Icon",
  //         },
  //         {
  //           url: `/icons/ico-icons`,
  //           type: "link",
  //           title: "Ico Icon",
  //         },
  //         {
  //           url: `/icons/themify-icons`,
  //           type: "link",
  //           title: "Themify Icon",
  //         },
  //         {
  //           url: `/icons/feather-icons`,
  //           type: "link",
  //           title: "Feather Icon",
  //         },
  //         {
  //           url: `/icons/weather-icons`,
  //           type: "link",
  //           title: "Whether Icon",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Buttons",
  //       icon: <Cloud />,
  //       type: "sub",
  //       menu: [
  //         {
  //           url: `/buttons/default-btn`,
  //           type: "link",
  //           title: "Default Style",
  //         },
  //         {
  //           url: `/buttons/group-btn`,
  //           type: "link",
  //           title: "Button Group",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Charts",
  //       icon: <BarChart />,
  //       type: "sub",
  //       menu: [
  //         {
  //           url: `/charts/apex-charts`,
  //           type: "link",
  //           title: "Apex Chart",
  //         },
  //         {
  //           url: `/charts/google-chart`,
  //           type: "link",
  //           title: "Google Chart",
  //         },
  //         {
  //           url: `/charts/chart-js`,
  //           type: "link",
  //           title: "Chartjs",
  //         },
  //       ],
  //     },
  //   ],
  // },


  // {
  //   className: "menu-box",
  //   menu: [
  //     {
  //       url: `/sample-page`,
  //       icon: <Layers />,
  //       title: "Sample Page",
  //       type: "sub",
  //     },
  //     {
  //       title: "Others",
  //       icon: <Layers />,
  //       type: "sub",
  //       menu: [
  //         {
  //           title: "Error Page",
  //           type: "sub",
  //           menu: [
  //             {
  //               title: "Error Page 1",
  //               type: "link",
  //               url: `/error/error-page1`,
  //             },
  //             {
  //               title: "Error Page 2",
  //               type: "link",
  //               url: `/error/error-page2`,
  //             },
  //             {
  //               title: "Error Page 3",
  //               type: "link",
  //               url: `/error/error-page3`,
  //             },
  //             {
  //               title: "Error Page 4",
  //               type: "link",
  //               url: `/error/error-page4`,
  //             },
  //             {
  //               title: "Error Page 5",
  //               type: "link",
  //               url: `/error/error-page5`,
  //             },
  //           ],
  //         },
  //         {
  //           title: "Coming Soon",
  //           type: "sub",

  //           menu: [
  //             {
  //               title: "Coming Sample",
  //               type: "link",
  //               url: `/coming/comingsimple`,
  //             },
  //             {
  //               title: "Coming with Bg-video",
  //               type: "link",
  //               url: `/coming/comingbgvideo`,
  //             },
  //             {
  //               title: "Coming with Bg-Image",
  //               type: "link",
  //               url: `/coming/comingbgimage`,
  //             },
  //           ],
  //         },
  //         {
  //           title: "Authentication",
  //           type: "sub",

  //           menu: [
  //             {
  //               title: "Login Simple",
  //               type: "link",

  //               url: `/authentication/login-simple`,
  //             },
  //             {
  //               title: "Login With bg image",
  //               type: "link",

  //               url: `/authentication/login-img`,
  //             },
  //             {
  //               title: "Login with image two",
  //               type: "link",

  //               url: `/authentication/login-bg-img`,
  //             },
  //             {
  //               title: "Login with validation",
  //               type: "link",

  //               url: `/authentication/login-validation`,
  //             },
  //             {
  //               title: "Login with tooltip",
  //               type: "link",

  //               url: `/authentication/login-tooltip`,
  //             },
  //             {
  //               title: "Login with sweetaleart",
  //               type: "link",

  //               url: `/authentication/login-sweetalert`,
  //             },
  //             {
  //               type: "link",
  //               title: "Register Simple",

  //               url: `/authentication/register-simpleimg`,
  //             },
  //             {
  //               title: "Register with Bg image",
  //               type: "link",

  //               url: `/authentication/register-bg-img`,
  //             },
  //             {
  //               title: "Register with Bg Video",
  //               type: "link",

  //               url: `/authentication/register-video`,
  //             },
  //             {
  //               title: "Unlock User",
  //               type: "link",

  //               url: `/authentication/unlock-user`,
  //             },
  //             {
  //               title: "Forgot Password",
  //               type: "link",

  //               url: `/authentication/forget-pwd`,
  //             },
  //             {
  //               title: "Create Passward",
  //               type: "link",

  //               url: `/authentication/create-pwd`,
  //             },
  //             {
  //               title: "Maintenance",
  //               type: "link",

  //               url: `/authentication/maintenance`,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },


  // {
  //   className: "menu-box",
  //   menu: [
  //     {
  //       icon: <Image />,
  //       title: "Gallery",
  //       type: "sub",
  //       menu: [
  //         {
  //           url: `/gallery/image-gallery`,
  //           title: "Gallery Grid",
  //           type: "link",
  //         },
  //         {
  //           url: `/gallery/image-with-desc`,
  //           type: "link",
  //           title: "Gallery Grid  Desc",
  //         },
  //         {
  //           url: `/gallery/mesonry-gallery`,
  //           type: "link",
  //           title: "Masonry Gallery",
  //         },
  //         {
  //           url: `/gallery/mesonry-desc`,
  //           type: "link",
  //           title: "Masonry With Desc",
  //         },
  //         {
  //           url: `/gallery/image-hover`,
  //           type: "link",
  //           title: "Hover Effect",
  //         },
  //       ],
  //     },
  //     {
  //       icon: <Film />,
  //       title: "Blog",
  //       type: "sub",
  //       menu: [
  //         {
  //           url: `/blog/blog-detail`,
  //           type: "link",
  //           title: "Blog Details",
  //         },
  //         {
  //           url: `/blog/blog-single`,
  //           type: "link",
  //           title: "Blog Single",
  //         },
  //         {
  //           url: `/blog/blog-post`,
  //           type: "link",
  //           title: "Add Post",
  //         },
  //       ],
  //     },
  //     {
  //       icon: <Package />,
  //       title: "Job Search",
  //       type: "sub",
  //       menu: [
  //         {
  //           url: `/job-search/card-view`,
  //           type: "link",
  //           title: "Cards View",
  //         },
  //         {
  //           url: `/job-search/job-list`,
  //           type: "link",
  //           title: "List View",
  //         },
  //         {
  //           url: `/job-search/job-detail`,
  //           type: "link",
  //           title: "Job Details",
  //         },
  //         {
  //           url: `/job-search/job-apply`,
  //           type: "link",
  //           title: "Apply",
  //         },
  //       ],
  //     },
  //     {
  //       icon: <Radio />,
  //       title: "Learning",
  //       type: "sub",
  //       menu: [
  //         {
  //           url: `/learning/learning-list`,
  //           type: "link",
  //           title: "Learning List",
  //         },
  //         {
  //           url: `/learning/learning-detail`,
  //           type: "link",
  //           title: "Detail Course",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Maps",
  //       icon: <Map />,
  //       type: "sub",
  //       menu: [
  //         {
  //           url: `/map/google-map`,
  //           type: "link",
  //           title: "Google Maps",
  //         },
  //         {
  //           url: `/map/pigeon-map`,
  //           type: "link",
  //           title: "Pigeon Maps",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Editor",
  //       icon: <Edit />,
  //       type: "sub",
  //       menu: [
  //         {
  //           url: `/editor/ck-editor`,
  //           type: "link",
  //           title: "CK  Editor",
  //         },
  //         {
  //           url: `/editor/mde-editor`,
  //           type: "link",
  //           title: "MDE Editor",
  //         },
  //         {
  //           url: `/editor/ace-code-editor`,
  //           type: "link",
  //           title: "ACE code editor",
  //         },
  //       ],
  //     },
  //     {
  //       url: `/faq`,
  //       icon: <HelpCircle />,
  //       title: "FAQ",
  //       type: "link",
  //     },
  //     {
  //       title: "knowledgebase",
  //       icon: <Sunrise />,
  //       type: "sub",
  //       menu: [
  //         {
  //           url: `/knowledgebase/knowledgebase`,
  //           type: "link",
  //           title: "knowledgebase",
  //         },
  //         {
  //           url: `/knowledgebase/knowledge-category`,
  //           type: "link",
  //           title: "KnowledgeCategory",
  //         },
  //         {
  //           url: `/knowledgebase/knowledge-detail-contain`,
  //           type: "link",
  //           title: "KnowledgeDetail",
  //         },
  //       ],
  //     },
  //     {
  //       url: `/support-ticket`,
  //       icon: <Users />,
  //       type: "link",
  //       title: "Support Ticket",
  //     },
  //   ],
  // },

];


export const SEARCHMENU = [
  {
    className: "menu-box",
    menu: [
      {
        title: "Dashboards",
        icon: <Home />,
        class: "lan-3",
        menu: [
          {
            title: "Default",
            url: `/dashboard/default`,
            class: "lan-4",
            type: "link",
          },
          {
            title: "Ecommerce",
            url: `/dashboard/ecommerce`,
            type: "link",
            class: "lan-5",
          },
        ],
      },
      {
        title: "Widgets",
        icon: <Airplay />,
        class: "lan-6",
        menu: [
          {
            url: `/widgets/general`,
            type: "link",
            title: "General",
            bookmark: true,
          },
          {
            url: `/widgets/chart`,
            type: "link",
            title: "Chart",
          },
        ],
      },
      {
        title: "Ecommerce",
        icon: <ShoppingBag />,
        type: "sub",
        menu: [
          {
            url: `/ecommerce/product`,
            title: "Product",
            type: "link",
            bookmark: true,
          },
          {
            url: `/ecommerce/product-page/1`,
            title: "Product Page",
            type: "link",
          },
          {
            url: `/ecommerce/product-list`,
            title: "Product List",
            type: "link",
          },
          {
            url: `/ecommerce/add-product`,
            title: "Add Product",
            type: "link",
          },
          {
            url: `/ecommerce/payment-details`,
            title: "Payment Detail",
            type: "link",
          },
          {
            url: `/ecommerce/orderhistory`,
            title: "Order History",
            type: "link",
          },
          {
            url: `/ecommerce/pricing`,
            title: "Pricing",
            type: "link",
          },
          {
            url: `/ecommerce/invoice`,
            title: "Invoice",
            type: "link",
          },
          {
            url: `/ecommerce/cart`,
            title: "Cart",
            type: "link",
          },
          {
            url: `/ecommerce/checkout`,
            title: "Checkout",
            type: "link",
          },
          {
            url: `/ecommerce/whishlist`,
            title: "Wishlist",
            type: "link",
          },
        ],
      },
    ],
  },
  {
    className: "menu-box",
    menu: [
      {
        title: "Chat",
        icon: <MessageCircle />,
        menu: [
          {
            url: `/chat-app`,
            type: "link",
            title: "Chat App",
          },
          {
            url: `/video-chat-app`,
            type: "link",
            title: "Video App",
          },
        ],
      },
      {
        title: "Users",
        icon: <Users />,
        menu: [
          {
            url: `/users/user-profile`,
            type: "link",
            title: "User Profile",
          },
          {
            url: `/users/user-edit`,
            type: "link",
            title: "Users Edit",
          },
          {
            url: `/users/user-cards`,
            type: "link",
            title: "User Cards",
          },
        ],
      },
      {
        title: "Email",
        icon: <Mail />,
        menu: [
          {
            url: `/email-app`,
            type: "link",
            title: "Mail Inbox",
          },
          {
            url: `/email-app/read-mail`,
            type: "link",
            title: "Read Mail",
          },
          {
            url: `/email-app/compose`,
            type: "link",
            title: "Compose",
          },
        ],
      },
      {
        url: `/file-manager`,
        icon: <GitPullRequest />,
        title: "File Manager",
        type: "link",
        bookmark: true,
      },
      {
        url: `/bookmark`,
        icon: <Heart />,
        bookmark: true,
        type: "link",
        title: "Bookmark",
      },
      {
        url: `/contact`,
        icon: <List />,
        type: "link",
        title: "Contacts",
      },
      {
        url: `/task`,
        icon: <CheckSquare />,
        type: "link",
        title: "Task",
      },
      {
        url: `/social-app`,
        icon: <Zap />,
        title: "Social App",
        type: "link",
        bookmark: true,
      },
      {
        url: `/search-result`,
        icon: <Search />,
        type: "link",
        title: "Search Result",
      },
      {
        url: `/todo-app/todo`,
        icon: <Clock />,
        type: "link",
        title: "To-Do",
      },
    ],
  },
  {
    className: "menu-box",
    menu: [
      {
        title: "Forms",
        icon: <FileText />,
        menu: [
          {
            title: "Form Controls",
            menu: [
              {
                title: "Form Validation",
                type: "link",
                url: `/forms/form-validation`,
              },
              {
                title: "Basic Input",
                type: "link",
                url: `/forms/baseInput`,
              },
              {
                title: "Checkbox & Radio",
                type: "link",
                url: `/forms/radio-checkbox`,
              },
              {
                title: "Input Groups",
                type: "link",
                url: `/forms/input-group`,
              },
              {
                title: "Mega Option",
                type: "link",
                url: `/forms/mega-options`,
              },
            ],
          },
          {
            title: "Form Widgets",
            menu: [
              {
                title: "Datepicker",
                type: "link",
                bookmark: true,
                url: `/form-widget/datepicker`,
              },
              {
                title: "Typeahead",
                type: "link",

                url: `/form-widget/typeahead`,
              },
              {
                title: "Rangepicker",
                type: "link",

                url: `/form-widget/rangepicker`,
              },
              {
                title: "Touchspin",
                type: "link",

                url: `/form-widget/touchspin`,
              },
              {
                title: "Select2",
                type: "link",

                url: `/form-widget/select`,
              },
              {
                title: "Switch",
                type: "link",

                url: `/form-widget/switch`,
              },
              {
                title: "Clipboard",
                type: "link",

                url: `/form-widget/clipboard`,
              },
            ],
          },
          {
            title: "Form Layout",
            menu: [
              {
                url: `/form-layout/form-default`,
                type: "link",
                title: "Form Default",
              },
              {
                url: `/form-layout/formWizard`,
                type: "link",
                title: "Form Wizard",
              },
            ],
          },
        ],
      },
      {
        title: "Tables",
        icon: <Server />,
        menu: [
          {
            title: "React Strap Table",
            url: `/table/reactstrap-table`,
            type: "link",
          },
          {
            title: "Data Tables",
            type: "link",
            url: `/table/datatable`,
          },
        ],
      },
    ],
  },
  {
    className: "menu-box",
    menu: [
      {
        title: "Ui-Kits",
        icon: <Box />,
        menu: [
          {
            url: `/ui-kits/typography`,
            title: "Typography",
            type: "link",
          },
          {
            url: `/ui-kits/avatar`,
            title: "Avatars",
            type: "link",
          },
          {
            url: `/ui-kits/helperclass`,
            title: "Helper-Classes",
            type: "link",
          },
          {
            url: `/ui-kits/grid`,
            title: "Grid",
            type: "link",
          },
          {
            url: `/ui-kits/tagsandpills`,
            title: "Tag & Pills",
            type: "link",
          },
          {
            url: `/ui-kits/progress-bar`,
            title: "Progress",
            type: "link",
          },
          {
            url: `/ui-kits/modal`,
            title: "Modal",
            type: "link",
          },
          {
            url: `/ui-kits/alert`,
            title: "Alert",
            type: "link",
          },
          {
            url: `/ui-kits/popover`,
            title: "Popover",
            type: "link",
          },
          {
            url: `/ui-kits/tooltips`,
            title: "Tooltip",
            type: "link",
          },
          {
            url: `/ui-kits/spinner`,
            title: "Spinners",
            type: "link",
          },
          {
            url: `/ui-kits/dropdown`,
            title: "Dropdown",
            type: "link",
          },
          {
            url: `/ui-kits/accordion`,
            title: "Accordion",
            type: "link",
          },
          {
            title: "Tabs",
            type: "sub",
            menu: [
              {
                title: "Bootstrap Tabs",
                type: "link",
                url: `/ui-kits/tab-bootstrap`,
              },
              {
                title: "Line Tabs",
                type: "link",
                url: `/ui-kits/tab-line`,
              },
            ],
          },
          {
            url: `/ui-kits/shadow`,
            title: "Shadow",
            type: "link",
          },
          {
            url: `/ui-kits/list`,
            title: "List",
            type: "link",
          },
        ],
      },
      {
        title: "Bonus Ui",
        type: "sub",
        icon: <FolderPlus />,
        menu: [
          {
            url: `/bonus-ui/scrollable`,
            type: "link",
            title: "Scrollable",
          },
          {
            url: `/bonus-ui/treeview`,
            type: "link",
            title: "Tree",
          },
          {
            url: `/bonus-ui/rating`,
            type: "link",
            title: "Rating",
          },
          {
            url: `/bonus-ui/carousel`,
            type: "link",
            title: "Carousel",
          },
          {
            url: `/bonus-ui/dropzone`,
            type: "link",
            title: "Dropzone",
          },
          {
            url: `/bonus-ui/tour`,
            type: "link",
            title: "Tour",
          },
          {
            url: `/bonus-ui/sweet-alert`,
            type: "link",
            title: "SweetAlert",
          },
          {
            url: `/bonus-ui/ribbons`,
            type: "link",
            title: "Ribbons",
          },
          {
            url: `/bonus-ui/pagination`,
            type: "link",
            title: "Pagination",
          },
          {
            url: `/bonus-ui/breadcrumb`,
            type: "link",
            title: "Breadcrumb",
          },
          {
            url: `/bonus-ui/range-slider`,
            type: "link",
            title: "Range Slider",
          },
          {
            url: `/bonus-ui/image-cropper`,
            type: "link",
            title: "Image Cropper",
          },
          {
            url: `/bonus-ui/sticky-notes`,
            type: "link",
            title: "Sticky",
          },
          {
            url: `/bonus-ui/drag-and-drop`,
            type: "link",
            title: "Drag and Drop",
          },
          {
            url: `/bonus-ui/image-upload`,
            type: "link",
            title: "Upload",
          },
          {
            url: `/bonus-ui/basic-cards`,
            type: "link",
            title: "Basic Card",
          },
          {
            url: `/bonus-ui/timeline`,
            type: "link",
            title: "Timeline",
          },
        ],
      },
      {
        title: "Icons",
        icon: <Command />,
        type: "sub",
        menu: [
          {
            url: `/icons/flag-icons`,
            type: "link",
            title: "Flag Icon",
          },
          {
            url: `/icons/font-awsome-icon`,
            type: "link",
            title: "Font awesome Icon",
          },
          {
            url: `/icons/ico-icons`,
            type: "link",
            title: "Ico Icon",
          },
          {
            url: `/icons/themify-icons`,
            type: "link",
            title: "Themify Icon",
          },
          {
            url: `/icons/feather-icons`,
            type: "link",
            title: "Feather Icon",
          },
          {
            url: `/icons/weather-icons`,
            type: "link",
            title: "Whether Icon",
          },
        ],
      },
      {
        title: "Buttons",
        icon: <Cloud />,
        type: "sub",
        menu: [
          {
            url: `/buttons/default-btn`,
            type: "link",
            title: "Default Style",
          },
          {
            url: `/buttons/group-btn`,
            type: "link",
            title: "Button Group",
          },
        ],
      },
      {
        title: "Charts",
        icon: <BarChart />,
        type: "sub",
        menu: [
          {
            url: `/charts/apex-charts`,
            type: "link",
            title: "Apex Chart",
            bookmark: true,
          },
          {
            url: `/charts/google-chart`,
            type: "link",
            title: "Google Chart",
          },
          {
            url: `/charts/chart-js`,
            type: "link",
            title: "Chartjs",
          },
        ],
      },
    ],
  },
  {
    className: "menu-box",
    menu: [
      {
        url: `/sample-page`,
        icon: <Layers />,
        title: "Sample Page",
        type: "sub",
      },
      {
        title: "Others",
        icon: <Layers />,
        type: "sub",
        menu: [
          {
            title: "Error Page",
            type: "sub",
            menu: [
              {
                title: "Error Page 1",
                type: "link",
                url: `/error/error-page1`,
              },
              {
                title: "Error Page 2",
                type: "link",
                url: `/error/error-page2`,
              },
              {
                title: "Error Page 3",
                type: "link",
                url: `/error/error-page3`,
              },
              {
                title: "Error Page 4",
                type: "link",
                url: `/error/error-page4`,
              },
              {
                title: "Error Page 5",
                type: "link",
                url: `/error/error-page5`,
              },
            ],
          },
          {
            title: "Coming Soon",
            type: "sub",

            menu: [
              {
                title: "Coming Sample",
                type: "link",
                url: `/coming/comingsimple`,
              },
              {
                title: "Coming with Bg-video",
                type: "link",
                url: `/coming/comingbgvideo`,
              },
              {
                title: "Coming with Bg-Image",
                type: "link",
                url: `/coming/comingbgimage`,
              },
            ],
          },
          {
            title: "Authentication",
            type: "sub",

            menu: [
              {
                title: "Login Simple",
                type: "link",

                url: `/authentication/login-simple`,
              },
              {
                title: "Login With bg image",
                type: "link",

                url: `/authentication/login-img`,
              },
              {
                title: "Login with image two",
                type: "link",

                url: `/authentication/login-bg-img`,
              },
              {
                title: "Login with validation",
                type: "link",

                url: `/authentication/login-validation`,
              },
              {
                title: "Login with tooltip",
                type: "link",

                url: `/authentication/login-tooltip`,
              },
              {
                title: "Login with sweetaleart",
                type: "link",

                url: `/authentication/login-sweetalert`,
              },
              {
                type: "link",
                title: "Register Simple",

                url: `/authentication/register-simpleimg`,
              },
              {
                title: "Register with Bg image",
                type: "link",

                url: `/authentication/register-bg-img`,
              },
              {
                title: "Register with Bg Video",
                type: "link",

                url: `/authentication/register-video`,
              },
              {
                title: "Unlock User",
                type: "link",

                url: `/authentication/unlock-user`,
              },
              {
                title: "Forgot Password",
                type: "link",

                url: `/authentication/forget-pwd`,
              },
              {
                title: "Create Passward",
                type: "link",

                url: `/authentication/create-pwd`,
              },
              {
                title: "Maintenance",
                type: "link",

                url: `/authentication/maintenance`,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    className: "menu-box",
    menu: [
      {
        icon: <Image />,
        title: "Gallery",
        type: "sub",
        menu: [
          {
            url: `/gallery/image-gallery`,
            title: "Gallery Grid",
            type: "link",
          },
          {
            url: `/gallery/image-with-desc`,
            type: "link",
            title: "Gallery Grid  Desc",
          },
          {
            url: `/gallery/mesonry-gallery`,
            type: "link",
            title: "Masonry Gallery",
          },
          {
            url: `/gallery/mesonry-desc`,
            type: "link",
            title: "Masonry With Desc",
          },
          {
            url: `/gallery/image-hover`,
            type: "link",
            title: "Hover Effect",
          },
        ],
      },
      {
        icon: <Film />,
        title: "Blog",
        type: "sub",
        menu: [
          {
            url: `/blog/blog-detail`,
            type: "link",
            title: "Blog Details",
          },
          {
            url: `/blog/blog-single`,
            type: "link",
            title: "Blog Single",
          },
          {
            url: `/blog/blog-post`,
            type: "link",
            title: "Add Post",
          },
        ],
      },
      {
        icon: <Package />,
        title: "Job Search",
        type: "sub",
        menu: [
          {
            url: `/job-search/card-view`,
            type: "link",
            title: "Cards View",
          },
          {
            url: `/job-search/job-list`,
            type: "link",
            title: "List View",
          },
          {
            url: `/job-search/job-detail`,
            type: "link",
            title: "Job Details",
          },
          {
            url: `/job-search/job-apply`,
            type: "link",
            title: "Apply",
          },
        ],
      },
      {
        icon: <Radio />,
        title: "Learning",
        type: "sub",
        menu: [
          {
            url: `/learning/learning-list`,
            type: "link",
            title: "Learning List",
          },
          {
            url: `/learning/learning-detail`,
            type: "link",
            title: "Detail Course",
          },
        ],
      },
      {
        title: "Maps",
        icon: <Map />,
        type: "sub",
        menu: [
          {
            url: `/map/google-map`,
            type: "link",
            title: "Google Maps",
          },
          {
            url: `/map/pigeon-map`,
            type: "link",
            title: "Pigeon Maps",
          },
        ],
      },
      {
        title: "Editor",
        icon: <Edit />,
        type: "sub",
        menu: [
          {
            url: `/editor/ck-editor`,
            type: "link",
            title: "CK  Editor",
          },
          {
            url: `/editor/mde-editor`,
            type: "link",
            title: "MDE Editor",
          },
          {
            url: `/editor/ace-code-editor`,
            type: "link",
            title: "ACE code editor",
          },
        ],
      },
      {
        url: `/faq`,
        icon: <HelpCircle />,
        title: "FAQ",
        type: "link",
      },
      {
        title: "knowledgebase",
        icon: <Sunrise />,
        type: "sub",
        menu: [
          {
            url: `/knowledgebase/knowledgebase`,
            type: "link",
            title: "knowledgebase",
          },
          {
            url: `/knowledgebase/knowledge-category`,
            type: "link",
            title: "KnowledgeCategory",
          },
          {
            url: `/knowledgebase/knowledge-detail-contain`,
            type: "link",
            title: "KnowledgeDetail",
          },
        ],
      },
      {
        url: `/support-ticket`,
        icon: <Users />,
        type: "link",
        title: "Support Ticket",
      },
    ],
  },
];