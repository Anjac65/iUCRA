import { Form, Input, InputNumber, Select, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { useSelector } from 'react-redux';
import { selectLangDirection } from '@/redux/translate/selectors';

const formItems = [
  {
    label: 'last_invoice_number',
    settingKey: 'last_invoice_number',
    valueType: 'number',
  },
  {
    label: 'last_quote_number',
    settingKey: 'last_quote_number',
    valueType: 'number',
  },
  {
    label: 'last_offer_number',
    settingKey: 'last_offer_number',
    valueType: 'number',
  },
  {
    label: 'last_news_number',
    settingKey: 'last_news_number',
    valueType: 'number',
  },
  {
    label: 'last_payment_number',
    settingKey: 'last_payment_number',
    valueType: 'number',
  },
  // {
  //   label: 'invoice_prefix',
  //   settingKey: 'invoice_prefix',
  //   valueType: 'string',
  // },
  // {
  //   label: 'quote_prefix',
  //   settingKey: 'quote_prefix',
  //   valueType: 'string',
  // },
  // {
  //   label: 'offer_prefix',
  //   settingKey: 'offer_prefix',
  //   valueType: 'string',
  // },
  // {
  //   label: 'payment_prefix',
  //   settingKey: 'payment_prefix',
  //   valueType: 'string',
  // },
];

export default function SettingForm() {
  const translate = useLanguage();
  const langDirection=useSelector(selectLangDirection)

  return (
    <div style={{direction:langDirection}}>
      {formItems.map((item) => {
        return (
          <Form.Item
            key={item.settingKey}
            label={item.label ? translate(item.label) : translate(item.settingKey)}
            name={item.settingKey}
            rules={[
              {
                required: true,
              },
            ]}
            valuePropName={item.valueType === 'boolean' ? 'checked' : 'value'}
          >
            {item.valueType === 'string' && <Input autoComplete="off" />}
            {item.valueType === 'number' && <InputNumber min={0} style={{ width: '100%' }} />}
            {item.valueType === 'boolean' && (
              <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
            )}
            {item.valueType === 'array' && (
              <Select
                mode="tags"
                style={{
                  width: '100%',
                }}
                tokenSeparators={[',']}
              />
            )}
          </Form.Item>
        );
      })}
    </div>
  );
}
