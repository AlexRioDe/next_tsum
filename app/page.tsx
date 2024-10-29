'use client'
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	getKeyValue,
	CircularProgress
} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

import {useState, useEffect } from "react";
import {Card, CardBody, CardFooter} from "@nextui-org/card";

const columns = [
	{
		key: "id",
		label: "Заказ №",
	},
	{
		key: "status",
		label: "Статус",
	},
	{
		key: "email",
		label: "Email",
	},
	{
		key: "name",
		label: "Имя",
	},
	{
		key: "tel",
		label: "Телефон",
	},
	{
		key: "price",
		label: "Сумма",
	},
	{
		key: "order",
		label: "Заказ",
	},
];


export default function Home() {
	const [orderList, setOrderList] = useState([]);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		(async () => {
			let res = await fetch('https://tsumstolovaya.by/wp-json/wc/v3/orders?consumer_key=ck_6bb268887ae2e056c2b31d999839a240a78dc3ea&consumer_secret=cs_c6dc0412bbb03b61acd825869e884a6e4fe5a43c');
			console.log(res)
			let json = await res.json();
			console.log('json', json)
			setOrderList(json);
			setLoading(false);
		})();
	}, []);
	return (
		<section>
			<Table aria-label="Example table with dynamic content">
				<TableHeader columns={columns}>
					{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
				</TableHeader>
				<TableBody items={orderList}>
					{(item) => (
							<TableRow key={item?.id}>
								<TableCell>{item?.id}</TableCell>
								<TableCell>{item?.status}</TableCell>
								<TableCell>{item?.billing?.email}</TableCell>
								<TableCell>{item?.billing?.first_name}</TableCell>
								<TableCell>{item?.billing?.phone}</TableCell>
								<TableCell>{item?.total}руб</TableCell>
								<TableCell>
									<Dropdown>
										<DropdownTrigger>
											<Button
													variant="bordered"
											>
												Посмотреть
											</Button>
										</DropdownTrigger>
										<DropdownMenu aria-label="Static Actions" items={item?.line_items}>
											{(line) => (
													<DropdownItem key={line?.id}>{line?.name} - {line?.total}руб</DropdownItem>
											)}
										</DropdownMenu>
									</Dropdown>
								</TableCell>
							</TableRow>
					)}
					
				</TableBody>
			</Table>
			{loading ? <div className="flex justify-center items-center"><CircularProgress size="lg" aria-label="Loading..." /></div> : '' }

			<div className="gap-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
				{orderList.map((item) => (
						<Card shadow="sm" key={item?.id} isPressable onPress={() => console.log("item pressed")}>
							<CardBody className="overflow-visible p-4 gap-2">
								<b>Заказ № {item?.id}</b>
								<p className="text-default-500">Статус: {item?.status}</p>
								<p className="text-default-500">{item?.billing?.email}</p>
								<b>{item?.billing?.first_name}</b>
								<p className="text-default-500">{item?.billing?.phone}</p>
							</CardBody>
							<CardFooter className="text-small justify-between">
								<p className="text-default-500">Сумма: {item?.total}</p>
								<Dropdown>
									<DropdownTrigger>
										<Button
												variant="bordered"
										>
											Посмотреть
										</Button>
									</DropdownTrigger>
									<DropdownMenu aria-label="Static Actions" items={item?.line_items}>
										{(line) => (
												<DropdownItem key={line?.id}>{line?.name} - {line?.total}руб</DropdownItem>
										)}
									</DropdownMenu>
								</Dropdown>
							</CardFooter>
						</Card>
				))}
			</div>
		</section>
	);
}
