// import { useEffect } from 'react';
// import {
//   EyeOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   FilePdfOutlined,
//   RedoOutlined,
//   PlusOutlined,
//   EllipsisOutlined,
//   ArrowRightOutlined,
//   ArrowLeftOutlined,
// } from '@ant-design/icons';
// import { Dropdown, Table, Button } from 'antd';
// import { PageHeader } from '@ant-design/pro-layout';

// import AutoCompleteAsync from '@/components/AutoCompleteAsync';
// import { useSelector, useDispatch } from 'react-redux';
// import useLanguage from '@/locale/useLanguage';
// import { erp } from '@/redux/erp/actions';
// import { selectListItems } from '@/redux/erp/selectors';
// import { useErpContext } from '@/context/erp';
// import { generate as uniqueId } from 'shortid';
// import { useNavigate } from 'react-router-dom';

// import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
// import { selectLangDirection } from '@/redux/translate/selectors';

// function AddNewItem({ config }) {
//   const navigate = useNavigate();
//   const { ADD_NEW_ENTITY, entity } = config;

//   const handleClick = () => {
//     navigate(`/${entity.toLowerCase()}/create`);
//   };

//   return (
//     <Button onClick={handleClick} type="primary" icon={<PlusOutlined />}>
//       {ADD_NEW_ENTITY}
//     </Button>
//   );
// }

// export default function DataTable({ config, extra = [] }) {
//   const translate = useLanguage();
//   let { entity, dataTableColumns, disableAdd = false, searchConfig } = config;

//   const { DATATABLE_TITLE } = config;

//   const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);

//   const { pagination, items: dataSource } = listResult;

//   const { erpContextAction } = useErpContext();
//   const { modal } = erpContextAction;

//   const items = [
//     {
//       label: translate('Show'),
//       key: 'read',
//       icon: <EyeOutlined />,
//     },
//     {
//       label: translate('Edit'),
//       key: 'edit',
//       icon: <EditOutlined />,
//     },
//     {
//       label: translate('Download'),
//       key: 'download',
//       icon: <FilePdfOutlined />,
//     },
//     ...extra,
//     {
//       type: 'divider',
//     },

//     {
//       label: translate('Delete'),
//       key: 'delete',
//       icon: <DeleteOutlined />,
//     },
//   ];

//   const navigate = useNavigate();

//   const handleRead = (record) => {
//     dispatch(erp.currentItem({ data: record }));
//     navigate(`/${entity}/read/${record._id}`);
//   };
//   const handleEdit = (record) => {
//     const data = { ...record };
//     dispatch(erp.currentAction({ actionType: 'update', data }));
//     navigate(`/${entity}/update/${record._id}`);
//   };
//   const handleDownload = (record) => {
//     window.open(`${DOWNLOAD_BASE_URL}${entity}/${entity}-${record._id}.pdf`, '_blank');
//   };

//   const handleDelete = (record) => {
//     dispatch(erp.currentAction({ actionType: 'delete', data: record }));
//     modal.open();
//   };

//   const handleRecordPayment = (record) => {
//     dispatch(erp.currentItem({ data: record }));
//     navigate(`/invoice/pay/${record._id}`);
//   };

//   dataTableColumns = [
//     ...dataTableColumns,
//     {
//       title: '',
//       key: 'action',
//       fixed: 'right',
//       render: (_, record) => (
//         <Dropdown
//           menu={{
//             items,
//             onClick: ({ key }) => {
//               switch (key) {
//                 case 'read':
//                   handleRead(record);
//                   break;
//                 case 'edit':
//                   handleEdit(record);
//                   break;
//                 case 'download':
//                   handleDownload(record);
//                   break;
//                 case 'delete':
//                   handleDelete(record);
//                   break;
//                 case 'recordPayment':
//                   handleRecordPayment(record);
//                   break;
//                 default:
//                   break;
//               }
//               // else if (key === '2')handleCloseTask
//             },
//           }}
//           trigger={['click']}
//         >
//           <EllipsisOutlined
//             style={{ cursor: 'pointer', fontSize: '24px' }}
//             onClick={(e) => e.preventDefault()}
//           />
//         </Dropdown>
//       ),
//     },
//   ];

//   const dispatch = useDispatch();

//   const handelDataTableLoad = (pagination) => {
//     const options = { page: pagination.current || 1, items: pagination.pageSize || 10 };
//     dispatch(erp.list({ entity, options }));
//   };

//   const dispatcher = () => {
//     dispatch(erp.list({ entity }));
//   };

//   useEffect(() => {
//     const controller = new AbortController();
//     dispatcher();
//     return () => {
//       controller.abort();
//     };
//   }, []);

//   const filterTable = (value) => {
//     const options = { equal: value, filter: searchConfig?.entity };
//     dispatch(erp.list({ entity, options }));
//   };
//   const langDirection=useSelector(selectLangDirection)

//   return (
//     <>
//       <PageHeader
//         title={DATATABLE_TITLE}
//         ghost={true}
//         onBack={() => window.history.back()}
//         backIcon={langDirection==="rtl"?<ArrowRightOutlined/>:<ArrowLeftOutlined />}
//         extra={[
//           <AutoCompleteAsync
//             key={`${uniqueId()}`}
//             entity={searchConfig?.entity}
//             displayLabels={['name']}
//             searchFields={'name'}
//             onChange={filterTable}
//             // redirectLabel={'Add New Client'}
//             // withRedirect
//             // urlToRedirect={'/customer'}
//           />,
//           <Button onClick={handelDataTableLoad} key={`${uniqueId()}`} icon={<RedoOutlined />}>
//             {translate('Refresh')}
//           </Button>,

//           !disableAdd && <AddNewItem config={config} key={`${uniqueId()}`} />,
//         ]}
//         style={{
//           padding: '20px 0px',
//           direction:langDirection
//         }}
//       ></PageHeader>

//       <Table
//         columns={dataTableColumns}
//         rowKey={(item) => item._id}
//         dataSource={dataSource}
//         pagination={pagination}
//         loading={listIsLoading}
//         onChange={handelDataTableLoad}
//         scroll={{ x: true }}
//       />
//     </>
//   );
// }

// import { useEffect } from 'react';
// import { PageHeader } from '@ant-design/pro-layout';
// import { FILE_BASE_URL } from '@/config/serverApiConfig';
// import {
//   EyeOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   FilePdfOutlined,
//   RedoOutlined,
//   PlusOutlined,
//   EllipsisOutlined,
//   ArrowRightOutlined,
//   ArrowLeftOutlined,
// } from '@ant-design/icons';
// import { Dropdown, Button, Card, Row, Col } from 'antd';
// import AutoCompleteAsync from '@/components/AutoCompleteAsync';
// import { useSelector, useDispatch } from 'react-redux';
// import useLanguage from '@/locale/useLanguage';
// import { erp } from '@/redux/erp/actions';
// import { selectListItems } from '@/redux/erp/selectors';
// import { useErpContext } from '@/context/erp';
// import { generate as uniqueId } from 'shortid';
// import { useNavigate } from 'react-router-dom';
// import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
// import { selectLangDirection } from '@/redux/translate/selectors';

// function AddNewItem({ config }) {
//   const navigate = useNavigate();
//   const { ADD_NEW_ENTITY, entity } = config;

//   const handleClick = () => {
//     navigate(`/${entity.toLowerCase()}/create`);
//   };

//   return (
//     <Button onClick={handleClick} type="primary" icon={<PlusOutlined />}>
//       {ADD_NEW_ENTITY}
//     </Button>
//   );
// }

// export default function DataTable({ config, extra = [] }) {
//   const translate = useLanguage();
//   let { entity, dataTableColumns, disableAdd = false, searchConfig } = config;

//   const { DATATABLE_TITLE } = config;

//   const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);
//   const { items: dataSource } = listResult; // We use items for card display
//   const { erpContextAction } = useErpContext();
//   const { modal } = erpContextAction;
//   const navigate = useNavigate();

//   const langDirection = useSelector(selectLangDirection);

//   const items = [
//     {
//       label: translate('Show'),
//       key: 'read',
//       icon: <EyeOutlined />,
//     },
//     {
//       label: translate('Edit'),
//       key: 'edit',
//       icon: <EditOutlined />,
//     },
//     {
//       label: translate('Download'),
//       key: 'download',
//       icon: <FilePdfOutlined />,
//     },
//     ...extra,
//     {
//       type: 'divider',
//     },
//     {
//       label: translate('Delete'),
//       key: 'delete',
//       icon: <DeleteOutlined />,
//     },
//   ];

//   const handleRead = (record) => {
//     navigate(`/${entity}/read/${record._id}`);
//   };

//   const handleEdit = (record) => {
//     const data = { ...record };
//     dispatch(erp.currentAction({ actionType: 'update', data }));
//     navigate(`/${entity}/update/${record._id}`);
//   };

//   const handleDownload = (record) => {
//     window.open(`${DOWNLOAD_BASE_URL}${entity}/${entity}-${record._id}.pdf`, '_blank');
//   };

//   const handleDelete = (record) => {
//     dispatch(erp.currentAction({ actionType: 'delete', data: record }));
//     modal.open();
//   };

//   const handleActionClick = (record, key) => {
//     switch (key) {
//       case 'read':
//         handleRead(record);
//         break;
//       case 'edit':
//         handleEdit(record);
//         break;
//       case 'download':
//         handleDownload(record);
//         break;
//       case 'delete':
//         handleDelete(record);
//         break;
//       default:
//         break;
//     }
//   };

//   const dispatch = useDispatch();

//   const loadData = () => {
//     const options = { page: 1, items: 9999 }; // Request a high number of items
//     dispatch(erp.list({ entity, options }));
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const filterTable = (value) => {
//     const options = { equal: value, filter: searchConfig?.entity };
//     dispatch(erp.list({ entity, options }));
//   };

//   return (
//     <>
//       <PageHeader
//         title={DATATABLE_TITLE}
//         ghost={true}
//         onBack={() => window.history.back()}
//         backIcon={langDirection === "rtl" ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
//         extra={[
//           <AutoCompleteAsync
//             key={`${uniqueId()}`}
//             entity={searchConfig?.entity}
//             displayLabels={['name']}
//             searchFields={'name'}
//             onChange={filterTable}
//           />,
//           <Button key={`${uniqueId()}`} icon={<RedoOutlined />} onClick={loadData}>
//             {translate('Refresh')}
//           </Button>,
//           !disableAdd && <AddNewItem config={config} key={`${uniqueId()}`} />,
//         ]}
//         style={{ padding: '20px 0px', direction: langDirection }}
//       />

//       <Row gutter={16} style={{ padding: '20px' }}>
//         {dataSource.map((record) => (
//           <Col span={8} key={record._id}>
//             <Card
//               hoverable
//               title={record.tittle}
//               cover={record.photo ? (
//                 <img
//                   alt="event"
//                   src={`${FILE_BASE_URL}${record.photo}`}
//                   style={{ height: '200px', objectFit: 'cover' }}
//                 />
//               ) : (
//                 <div style={{ height: '200px', backgroundColor: '#f0f0f0' }} />
//               )}
//               actions={[
//                 <Dropdown
//                   menu={{
//                     items,
//                     onClick: ({ key }) => handleActionClick(record, key),
//                   }}
//                   trigger={['click']}
//                 >
//                   <EllipsisOutlined style={{ cursor: 'pointer' }} />
//                 </Dropdown>
//               ]}
//             >
//               <p>{record.content}</p>
//               <p>{new Date(record.schedule).toLocaleString()}</p>
//               <p>Status: {record.status}</p>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </>
//   );
// }
import { PageHeader } from '@ant-design/pro-layout';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel, Card, Button, Dropdown } from 'antd';
import { PlusOutlined, RedoOutlined, EyeOutlined, EditOutlined, DeleteOutlined, FilePdfOutlined, ArrowRightOutlined, ArrowLeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { FILE_BASE_URL, DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import useLanguage from '@/locale/useLanguage';
import { erp } from '@/redux/erp/actions';
import { selectListItems } from '@/redux/erp/selectors';
import { selectLangDirection } from '@/redux/translate/selectors';
import { useErpContext } from '@/context/erp';
import { generate as uniqueId } from 'shortid';

function AddNewItem({ config }) {
  const navigate = useNavigate();
  const { ADD_NEW_ENTITY, entity } = config;

  const handleClick = () => {
    navigate(`/${entity.toLowerCase()}/create`);
  };

  return (
    <Button onClick={handleClick} type="primary" icon={<PlusOutlined />}>
      {ADD_NEW_ENTITY}
    </Button>
  );
}

export default function DataTable({ config, extra = [] }) {
  const translate = useLanguage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const langDirection = useSelector(selectLangDirection);
  let { entity, disableAdd = false, searchConfig } = config;

  const { DATATABLE_TITLE } = config;
  const { result: listResult } = useSelector(selectListItems);
  const { items: dataSource } = listResult; // We use items for card display
  const { erpContextAction } = useErpContext();
  const { modal } = erpContextAction;

  const items = [
    { label: translate('Show'), key: 'read', icon: <EyeOutlined /> },
    { label: translate('Edit'), key: 'edit', icon: <EditOutlined /> },
    { label: translate('Download'), key: 'download', icon: <FilePdfOutlined /> },
    ...extra,
    { type: 'divider' },
    { label: translate('Delete'), key: 'delete', icon: <DeleteOutlined /> },
  ];

  const handleRead = (record) => navigate(`/${entity}/read/${record._id}`);
  const handleEdit = (record) => {
    dispatch(erp.currentAction({ actionType: 'update', data: record }));
    navigate(`/${entity}/update/${record._id}`);
  };
  const handleDownload = (record) => window.open(`${DOWNLOAD_BASE_URL}${entity}/${entity}-${record._id}.pdf`, '_blank');
  const handleDelete = (record) => {
    dispatch(erp.currentAction({ actionType: 'delete', data: record }));
    modal.open();
  };

  const handleActionClick = (record, key) => {
    switch (key) {
      case 'read': handleRead(record); break;
      case 'edit': handleEdit(record); break;
      case 'download': handleDownload(record); break;
      case 'delete': handleDelete(record); break;
      default: break;
    }
  };

  const loadData = () => {
    const options = { page: 1, items: 9999 };
    dispatch(erp.list({ entity, options }));
  };

  useEffect(() => {
    loadData();
  }, []);

  const filterTable = (value) => {
    const options = { equal: value, filter: searchConfig?.entity };
    dispatch(erp.list({ entity, options }));
  };

  return (
    <>
      {/* <PageHeader
        title={DATATABLE_TITLE}
        ghost={true}
        onBack={() => window.history.back()}
        backIcon={langDirection === "rtl" ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
        extra={[
          <AutoCompleteAsync
            key={`${uniqueId()}`}
            entity={searchConfig?.entity}
            displayLabels={['name']}
            searchFields={'name'}
            onChange={filterTable}
          />,
          <Button key={`${uniqueId()}`} icon={<RedoOutlined />} onClick={loadData}>
            {translate('Refresh')}
          </Button>,
          !disableAdd && <AddNewItem config={config} key={`${uniqueId()}`}/>,
        ]}
        style={{ padding: '20px 0px', direction: langDirection }}
      /> */}
      /* change by Pi */
      <Carousel autoplay dots={false} swipeToSlide adaptiveHeight>
        {dataSource.map((record) => (
          <div key={record._id}>
            <Card
              hoverable
              title={record.tittle}
              cover={record.photo ? (
                <img
                  alt="event"
                  src={`${FILE_BASE_URL}${record.photo}`}
                  style={{ height: '350px', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ height: '350px', backgroundColor: '#f0f0f0' }} />
              )}
              actions={[
                <Dropdown
                  menu={{
                    items,
                    onClick: ({ key }) => handleActionClick(record, key),
                  }}
                  trigger={['click']}
                >
                  <EllipsisOutlined style={{ cursor: 'pointer' }} />
                </Dropdown>
              ]}
              style={{
                width: '700px', // Set the width here
                height: '700px', // Optional: set height if you want
                margin: '0 auto', // Centers the card in the Carousel
                background: '#000000',
                color: '#fff',
                fontSize: '30px',
                fontWeight: 'bold',
              }}
            >
              <p>{record.content}</p>
              <p>{new Date(record.schedule).toLocaleString()}</p>
              <p>Status: {record.status}</p>
            </Card>
          </div>
        ))}
      </Carousel>
    </>
  );
}



// import { useEffect } from 'react';
// import {
//   EyeOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   FilePdfOutlined,
//   RedoOutlined,
//   PlusOutlined,
//   EllipsisOutlined,
//   ArrowLeftOutlined,
// } from '@ant-design/icons';
// import { Dropdown, Card, Button, Carousel } from 'antd';
// import { PageHeader } from '@ant-design/pro-layout';

// import AutoCompleteAsync from '@/components/AutoCompleteAsync';
// import { useSelector, useDispatch } from 'react-redux';
// import useLanguage from '@/locale/useLanguage';
// import { erp } from '@/redux/erp/actions';
// import { selectListItems } from '@/redux/erp/selectors';
// import { useErpContext } from '@/context/erp';
// import { generate as uniqueId } from 'shortid';
// import { FILE_BASE_URL } from '@/config/serverApiConfig';
// import { useNavigate } from 'react-router-dom';

// import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';

// function AddNewItem({ config }) {
//   const navigate = useNavigate();
//   const { ADD_NEW_ENTITY, entity } = config;

//   const handleClick = () => {
//     navigate(`/${entity.toLowerCase()}/create`);
//   };

//   return (
//     <Button onClick={handleClick} type="primary" icon={<PlusOutlined />}>
//       {ADD_NEW_ENTITY}
//     </Button>
//   );
// }

// export default function DataCardCarousel({ config, extra = [] }) {
//   const translate = useLanguage();
//   const { entity, disableAdd = false, searchConfig } = config;
//   const { DATATABLE_TITLE } = config;
  
//   const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);
//   const { items: dataSource } = listResult;

//   const { erpContextAction } = useErpContext();
//   const { modal } = erpContextAction;

//   const items = [
//     {
//       label: translate('Show'),
//       key: 'read',
//       icon: <EyeOutlined />,
//     },
//     {
//       label: translate('Edit'),
//       key: 'edit',
//       icon: <EditOutlined />,
//     },
//     {
//       label: translate('Download'),
//       key: 'download',
//       icon: <FilePdfOutlined />,
//     },
//     ...extra,
//     {
//       type: 'divider',
//     },
//     {
//       label: translate('Delete'),
//       key: 'delete',
//       icon: <DeleteOutlined />,
//     },
//   ];

//   const navigate = useNavigate();

//   const handleRead = (record) => {
//     dispatch(erp.currentItem({ data: record }));
//     navigate(`/${entity}/read/${record._id}`);
//   };
//   const handleEdit = (record) => {
//     const data = { ...record };
//     dispatch(erp.currentAction({ actionType: 'update', data }));
//     navigate(`/${entity}/update/${record._id}`);
//   };
//   const handleDownload = (record) => {
//     window.open(`${DOWNLOAD_BASE_URL}${entity}/${entity}-${record._id}.pdf`, '_blank');
//   };
//   const handleDelete = (record) => {
//     dispatch(erp.currentAction({ actionType: 'delete', data: record }));
//     modal.open();
//   };

//   const dispatch = useDispatch();

//   const dispatcher = () => {
//     dispatch(erp.list({ entity }));
//   };

//   useEffect(() => {
//     dispatcher();
//   }, []);

//   const filterTable = (value) => {
//     const options = { equal: value, filter: searchConfig?.entity };
//     dispatch(erp.list({ entity, options }));
//   };

//   return (
//     <>
//       <PageHeader
//         title={DATATABLE_TITLE}
//         ghost={true}
//         onBack={() => window.history.back()}
//         backIcon={<ArrowLeftOutlined />}
//         extra={[
//           <AutoCompleteAsync
//             key={`${uniqueId()}`}
//             entity={searchConfig?.entity}
//             displayLabels={['name']}
//             searchFields={'name'}
//             onChange={filterTable}
//           />,
//           <Button onClick={dispatcher} key={`${uniqueId()}`} icon={<RedoOutlined />}>
//             {translate('Refresh')}
//           </Button>,
//           !disableAdd && <AddNewItem config={config} key={`${uniqueId()}`} />,
//         ]}
//         style={{
//           padding: '20px 0px',
//         }}
//       />

//       <Carousel
//         autoplay
//         dots={true}
//         className="card-carousel"
//         style={{ padding: '20px', width: '100%' }}
//       >
//         {dataSource.map((record) => (
//           <Card
//             key={record._id}
//             title={record.name || ` ${record.tittle}`}
//             extra={
//               <Dropdown
//                 menu={{
//                   items,
//                   onClick: ({ key }) => {
//                     switch (key) {
//                       case 'read':
//                         handleRead(record);
//                         break;
//                       case 'edit':
//                         handleEdit(record);
//                         break;
//                       case 'download':
//                         handleDownload(record);
//                         break;
//                       case 'delete':
//                         handleDelete(record);
//                         break;
//                       default:
//                         break;
//                     }
//                   },
//                 }}
//                 trigger={['click']}
//               >
//                 <EllipsisOutlined style={{ cursor: 'pointer', fontSize: '24px' }} />
//               </Dropdown>
//             }
//             hoverable
//             style={{
//               width: '100%',
//               maxWidth: '400px',
//               margin: '0 auto',
//               boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//             }}
//           >
//             <p>{record.photo ? (
//       <img src={record?.photo ? FILE_BASE_URL + record?.photo : undefined} alt="event" style={{ width: '100px' }} />
//     ) : (
//       translate('No Photo')
//     )}</p>
//             <p>{`${record.content}`}</p>
//           </Card>
//         ))}
//       </Carousel>
//     </>
//   );
// }
