import { useState, useEffect } from 'react';
import { Form, Divider } from 'antd';
import dayjs from 'dayjs';
import { Button, Tag, Input, Upload, DatePicker, Select } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

import { useSelector, useDispatch } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { erp } from '@/redux/erp/actions';

import { generate as uniqueId } from 'shortid';
import { selectUpdatedItem } from '@/redux/erp/selectors';
import Loading from '@/components/Loading';
import { tagColor } from '@/utils/statusTagColor';

import { CloseCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { settingsAction } from '@/redux/settings/actions';

// Function to get current date in Malaysia time
const getMalaysiaTime = () => {
  const now = new Date();
  const malaysiaOffset = 8 * 60; // Malaysia is UTC+8
  const localOffset = now.getTimezoneOffset(); // Local timezone offset in minutes
  const offsetDifference = malaysiaOffset - localOffset;
  
  // Adjust the date to Malaysia time
  return new Date(now.getTime() + offsetDifference * 60 * 1000);
};
// import { StatusTag } from '@/components/Tag';
function SaveForm({ form, translate }) {
  const handleClick = () => {
    form.submit();
  };

  return (
    <Button onClick={handleClick} type="primary" icon={<PlusOutlined />}>
      {translate('update')}
    </Button>
  );
}

export default function UpdateItem({ config, UpdateForm }) {
  const translate = useLanguage();
  let { entity } = config;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);
  const [form] = Form.useForm();

  const resetErp = {
    tittle: '',
    content: '',
    photo: '',
    schedule: null,
    status: '',
  };

  const [currentErp, setCurrentErp] = useState(current ?? resetErp);

  const { id } = useParams();

  const onSubmit = (fieldsValue) => {
    console.log('🚀 ~ onSubmit ~ fieldsValue:', fieldsValue);
    const dataToUpdate = {
      ...fieldsValue,
      schedule: fieldsValue.schedule ? dayjs(fieldsValue.schedule).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
    };
      const formData = new FormData();
      formData.append('number', fieldsValue.number);
      formData.append('tittle', fieldsValue.tittle);
      formData.append('content', fieldsValue.content);
      fieldsValue.images?.forEach((file, index) => {
      if (file.originFileObj instanceof File) {
        formData.append(`files[]`, file.originFileObj);
        }
      });
      if(fieldsValue.schedule!=null){
      formData.append('schedule', fieldsValue.schedule);
      }else{
        formData.append('schedule', new Date());
      }
      formData.append('status', fieldsValue.status);
    
    dispatch(erp.update({ entity, id, jsonData: formData }));
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(erp.resetAction({ actionType: 'update' }));
      navigate(`/${entity.toLowerCase()}/read/${id}`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (current) {
      setCurrentErp(current);
      let formData = { ...current };
      formData.schedule = formData.schedule ? dayjs(formData.schedule) : null;
      form.resetFields();
      form.setFieldsValue(formData);
    }
  }, [current]);

  return (
    <>
      <PageHeader
        onBack={() => {
          navigate(`/${entity.toLowerCase()}`);
        }}
        title={translate('update')}
        ghost={false}
        tags={[
          <Tag color={tagColor(currentErp.status)?.color} key="status">
            {currentErp.status && translate(currentErp.status)}
          </Tag>,
        ]}
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => navigate(`/${entity.toLowerCase()}`)}
            icon={<CloseCircleOutlined />}
          >
            {translate('Cancel')}
          </Button>,
          <SaveForm translate={translate} form={form} key={`${uniqueId()}`} />,
        ]}
        style={{ padding: '20px 0px' }}
      ></PageHeader>
      <Divider dashed />
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <UpdateForm current={current} />
        </Form>
      </Loading>
    </>
  );
}
