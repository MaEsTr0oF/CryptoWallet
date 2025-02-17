import { useRef, useState } from "react";
import { Select, Space, Typography, Flex, Divider, Form, InputNumber,Button,DatePicker,Result } from "antd";
import { useCrypto } from "../context/crypto-context";
import CoinInfo from "./coinInfo";
export default function AddAssetForm({onClose}) {
  const { crypto,addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [select, setSelect] = useState(false);
  const [submitted,setSubmitted]= useState(false)
  const assetRef =useRef()
  const [form] = Form.useForm()
  if(submitted){
	return(
		<Result
    status="success"
    title="New Asset Added"
    subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
    extra={[
      <Button type="primary" key="console" onClick={onClose}>
        Close
      </Button>,
    ]}
  />
	)
  }
  if (!coin) {
    return (
      <Select
        style={{
          width: "100%",
        }}
        onClick={() => setSelect((prev) => !prev)}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Select coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          emoji: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.emoji}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  function onFinish(value){
	const newAsset ={
		id: coin.id,
		amount: value.amount,
		price: value.price,
		date: value.date?.$d ?? new Date(),
	}
	assetRef.current = newAsset
	setSubmitted(true)
	addAsset(newAsset)
  }
  const validateMessages={
	required: "${label} is required",
	types:{
		number: '${label} is no valid number'
	},
	number:{
		range:'${label must be between ${min} and {max}}',
	}
  }
  function handleAmountChange(value){
	const price =form.getFieldValue('price')
		form.setFieldsValue({
			total: +(value* price).toFixed(2),
		})
  }

  function handlePriceChange(value){
		const amount =form.getFieldValue('amount')
		form.setFieldsValue({
			total: +(value* amount).toFixed(2),
		})
  }
  return (
	<Form
	form={form}
	name="basic"
	labelCol={{
	  span: 4,
	}}
	wrapperCol={{
	  span: 10,
	}}
	style={{
	  maxWidth: 600,
	}}
	initialValues={{
		price:+coin.price.toFixed(2),
		}}
	onFinish={onFinish}
	validateMessages={validateMessages}
 >
      <CoinInfo coin={coin}/>
      <Divider
        style={{
          borderColor: "black",
        }}
      />
      
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              type: 'number',
				  min:0,
            },
          ]}
        >
          <InputNumber onChange={handleAmountChange} placeholder='Enter value' style={{width:"100%"}} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
        >
          <InputNumber onChange={handlePriceChange} style={{width:"100%"}}/>
        </Form.Item>
		  <Form.Item
          label="Date % time"
          name="date"
        >
          <DatePicker showTime/>
        </Form.Item>
		  <Form.Item
          label="Total"
          name="total"
        >
          <InputNumber disabled style={{width:"100%"}}/>
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit">
            Add Asset
          </Button>
        </Form.Item>
      </Form>
  );
}
