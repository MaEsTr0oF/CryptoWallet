import { Layout,Select,Space,Button ,Modal,Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useState,useEffect } from 'react';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';
const headerStyle = {
	width:'100%',
	textAlign: 'center',
	height: '60px',
	padding:'1rem',
	display:'flex',
	justifyContent:'space-between',
	alignItems:'center',
 };
 const handleChange = (value) => {
	console.log(`selected ${value}`);
 };
export default function AppHeader(){
	const [ select,setSelect]=useState(false)
	const [ modal,setModal]=useState(false)
	const [ drawer,setDrawer]=useState(false)
	const [ coin,setCoin]=useState(null)
	const {crypto} = useCrypto()

	useEffect(()=>{
		const keypress = event => {
			if(event.key==='/'){
				setSelect((prev)=>!prev)
			}
		}
		document.addEventListener('keypress',keypress)
		return ()=>document.removeEventListener('keypress',keypress)
	},[])

	function handleSelect(value){
		console.log(value)
		setModal(true)
		setCoin(crypto.find((c)=>c.id===value))
	}
	
	return(
		<Layout.Header style={headerStyle}>
			 <Select
				style={{
					width: 250,
				}}
				open={select}
				onClick={()=>setSelect((prev)=>!prev)}
				onSelect={handleSelect}
				value="press / to open"
				options={crypto.map(coin=>({
					label: coin.name,
					value:coin.id,
					emoji :coin.icon,
				}))}
				optionRender={(option) => (
					<Space>
						<img 
						style={{ width:20 }}
						src={option.data.emoji} 
						alt={option.data.label}/>
						{' '}
						 {option.data.label}
					</Space>
				)}
			/>

			<Button type="primary" onClick={()=>setDrawer(true)}>Add assetText</Button>

			<Modal 
			open={modal} 
			onCancel={()=>setModal(false)}
			footer={null}
			>
        <CoinInfoModal coin={coin}/>
      	</Modal>
		<Drawer width={600} title="Add Asset" onClose={()=>setDrawer(false)} open={drawer} destroyOnClose={true}>
        <AddAssetForm onClose={()=>setDrawer(false)}/>
      </Drawer>
		</Layout.Header>
	)
}