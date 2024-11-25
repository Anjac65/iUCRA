import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col, message, Upload } from 'antd';

import { UploadOutlined } from '@ant-design/icons';

import { PlusOutlined } from '@ant-design/icons';

import { DatePicker } from 'antd';
import { selectFinanceSettings } from '@/redux/settings/selectors';

import { useSelector } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
// import AutoCompleteAsync from '@/components/AutoCompleteAsync';
// import SelectAsync from '@/components/SelectAsync';

// import ItemRow from '@/modules/ErpPanelModule/ItemRow';

// import MoneyInputFormItem from '@/components/MoneyInputFormItem';

// import calculate from '@/utils/calculate';

// import { useDate } from '@/settings';

// import SelectCurrency from '@/components/ChooseCurrency';

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('Image must smaller than 5MB!');
  }
  return false;
};


export default function NewsForm({ subTotal = 0, current = null }) {
  const { last_news_number } = useSelector(selectFinanceSettings);

  if (last_news_number === undefined) {
    return <></>;
  }

  return <LoadNewsForm subTotal={subTotal} current={current} />;
}

function LoadNewsForm({ subTotal = 0, current = null }) {
  const translate = useLanguage();
  // const { dateFormat } = useDate();
  const { last_news_number } = useSelector(selectFinanceSettings);
  const [lastNumber, setLastNumber] = useState(() => last_news_number + 1);
  // const [total, setTotal] = useState(0);
  // const [taxRate, setTaxRate] = useState(0);
  // const [taxTotal, setTaxTotal] = useState(0);
  // const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  // const handelTaxChange = (value) => {
  //   setTaxRate(value / 100);
  // };

  // useEffect(() => {
  //   if (current) {
  //     const { taxRate = 0, year, number } = current;
  //     setTaxRate(taxRate / 100);
  //     setCurrentYear(year);
  //     setLastNumber(number);
  //   }
  // }, [current]);
  // useEffect(() => {
  //   const currentTotal = calculate.add(calculate.multiply(subTotal, taxRate), subTotal);
  //   setTaxTotal(calculate.multiply(subTotal, taxRate));
  //   setTotal(currentTotal);
  // }, [subTotal, taxRate]);

  // const addField = useRef(false);

  // useEffect(() => {
  //   addField.current.click();
  // }, []);

  return (
    <>
    <Row gutter={[12, 0]}>
      <Col className="gutter-row" span={3}>
          <Form.Item
            label={translate('Event ID')}
            name="number"
            initialValue={lastNumber}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={3}>
          <Form.Item
            name="entity"
            initialValue="news"
            rules={[
              {
                required: true,
              },
            ]}
          >
          </Form.Item>
        </Col>
    </Row>
    <Row gutter={[12, 0]}>
      <Col className="gutter-row" span={20}>
          <Form.Item label={translate('Tittle')} name="tittle"
          rules={[
            {
              required: true,
            },
          ]}>
            <Input />
          </Form.Item>
      </Col>
      <Col className="gutter-row" span={20}>
          <Form.Item label={translate('Content')} name="content"
          rules={[
            {
              required: true,
            },
          ]}>
             <Input.TextArea placeholder="Enter Content" rows={4} />
          </Form.Item>
      </Col>
        {/* Photo */}
      <Col className="gutter-row" span={20}>
         <Form.Item
        name="images"
        label={translate('Photo')}
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          return e.fileList; // Ensures that the form state captures the file list exactly as required.
        }}
      >
        <Upload
          beforeUpload={beforeUpload}
          listType="picture"
          accept="image/png, image/jpeg"
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>{translate('click_to_upload')}</Button>
        </Upload>
      </Form.Item>
      </Col>
       {/* Schedule (Date and Time) */}
      <Col span={6}>
          <Form.Item
            name="schedule"
            label="Schedule"
            // initialValue={new Date('0000-00-00T00:00:00')}
            rules={[
              { required: false, type: 'object', message: 'Please select the Schedule' },
            ]}
          >
            <DatePicker 
              style={{ width: '100%' }} 
              showTime 
              format="YYYY-MM-DD HH:mm:ss" 
              placeholder="Select Date and Time" 
            />
          </Form.Item>
      </Col>
         {/* Status */}
      <Col span={6}>
          <Form.Item
            name="status"
            label="Status"
            rules={[
              { required: true, message: 'Please select a Status' },
            ]}
            initialValue="draft"
          >
            <Select
              options={[
                { value: 'draft', label: 'Draft' },
                { value: 'pending', label: 'Pending' },
                { value: 'published', label: 'Published' },
                { value: 'archived', label: 'Archived' },
              ]}
              placeholder="Select Status"
            />
          </Form.Item>
      </Col>
    </Row>
      
      <Divider dashed />
      <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={5}>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
                {translate('Save')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </div>

    </>
    // <>
    //   <Form.Item
    //     label={translate('Tittle')}
    //     name="tittle"
    //     rules={[
    //       {
    //         required: true,
    //       },
    //     ]}
    //   >
    //     <Input autoComplete="off" />
    //   </Form.Item>
    //   <Form.Item
    //     label={translate('Content')}
    //     name="content"
    //     rules={[
    //       {
    //         required: true,
    //       },
    //     ]}
    //   >
    //     <Input autoComplete="off" />
    //   </Form.Item>
    //   <Form.Item
    //     label={translate('schedule')}
    //     name="schedule"
    //     rules={[
    //       {
    //         required: true,
    //       },
    //     ]}
    //   >
    //     <Input autoComplete="off" />
    //   </Form.Item>
    //   <Form.Item
    //     label={translate('status')}
    //     name="status"
    //     rules={[
    //       {
    //         required: true,
    //       },
    //     ]}
    //   >
    //     <Input autoComplete="off" />
    //   </Form.Item>

    //   <Form.Item
    //     name="file"
    //     label={translate('Photo')}
    //     valuePropName="fileList"
    //     getValueFromEvent={(e) => e.fileList}
    //   >
    //     <Upload
    //       beforeUpload={beforeUpload}
    //       listType="picture"
    //       accept="image/png, image/jpeg"
    //       maxCount={1}
    //     >
    //       <Button icon={<UploadOutlined />}>{translate('click_to_upload')}</Button>
    //     </Upload>
    //   </Form.Item>
      
    // </>
  );
}
