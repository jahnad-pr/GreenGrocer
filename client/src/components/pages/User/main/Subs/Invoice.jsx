import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Invoice = () => {

    const navigator = useNavigate()
    const location = useLocation()

    const [data, setData] = useState(location.state.data)

    useEffect(() => {
        setData(location.state.data);
    }, [location])

    const downloadInvoice = (data) => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Invoice', 14, 22);
        doc.setFontSize(12);
        doc.text(`Order ID: ${data.order_id}`, 14, 32);
        doc.text(`Customer Name: ${data.user.username}`, 14, 42);
        doc.text(`Order Date: ${new Date(data.time).toLocaleDateString()}`, 14, 52);
        doc.text(`Total Amount: INR ${data.price.grandPrice}`, 14, 62);

        // Delivery Address
        doc.text('Delivery Address:', 14, 72);
        doc.text(`${data.delivery_address.FirstName} ${data.delivery_address.LastName}`, 14, 82);
        doc.text(`${data.delivery_address.streetAddress}`, 14, 92);
        doc.text(`${data.delivery_address.city}, ${data.delivery_address.state} - ${data.delivery_address.pincode}`, 14, 102);

        // Order Summary
        doc.text('Order Summary:', 14, 112);
        doc.autoTable({
            head: [['Description', 'Amount']],
            body: [
                ['Total for Products', `INR ${data.price.others.totel.toFixed(2)}`],
                ['Delivery Charge', `INR ${data.price.others.delivery.toFixed(2)}`],
                ['Tax', `INR ${data.price.others.tax.toFixed(2)}`],
                ['Discount Amount', `INR ${data.price.discountPrice.toFixed(2)}`],
                ['Grand Total', `INR ${data.price.grandPrice}`]
            ],
            startY: doc.autoTable.previous.finalY + 10,
            styles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                lineWidth: 0.5,
                lineColor: [0, 0, 0],
                fontSize: 10,
                halign: 'left',
            },
            headStyles: {
                fillColor: [50, 160, 85],
                textColor: [255, 255, 255],
                fontSize: 12,
                halign: 'left',
            },
            margin: { top: 10 },
        });

        // Items Table
        doc.autoTable({
            head: [['Item', 'Quantity', 'Price', 'Discount Price']],
            body: data.items.map(item => [
                item.product.name,
                `${item.quantity / 1000} KG`,
                `INR ${((item.product.regularPrice * (item.quantity / 1000)).toFixed(2))}`,
                `INR ${((data.price.discountPrice) / data.items.length || 0).toFixed(2)}`
            ]),
            startY: doc.autoTable.previous.finalY + 10,
            styles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                lineWidth: 0.5,
                lineColor: [0, 0, 0],
                fontSize: 10,
                halign: 'center',
            },
            headStyles: {
                fillColor: [50, 160, 85],
                textColor: [255, 255, 255],
                fontSize: 12,
                halign: 'center',
            },
            margin: { top: 10 },
        });

        doc.save(`invoice_${data.order_id}.pdf`);
    };

    return (
        <div className="w-[96%] min-h-screen bg-[#f2f2f2] overflow-x-hidden">
            <div className="w-full h-full px-4 md:px-20 lg:px-80 flex flex-col items-center gap-5 fade-in">

                <div onClick={() => navigator(-1) }
                
                    className="flex items-center gap-1 cursor-pointer hover:text-blue-500 duration-300 absolute left-40 top-8 group">
                    <i className='ri-arrow-left-s-fill inline-block text-[28px] relative left-0 duration-500 group-hover:-left-5'></i>
                    <p className='text-[18px]'>Back to Success Page</p>
                </div>

                {/* Header */}
                <h1 className="text-[30px] font-bold my-10 mt-16 slide-down">Order Invoice</h1>

                <div className="w-full bg-[linear-gradient(45deg,#ffffff90,#ffffff70)] backdrop-blur-sm rounded-[40px] p-8">
                    <div className="flex justify-between mb-8">
                        <div className="space-y-2 min-w-[250px]">
                            <div className="text-sm space-y-1">
                                <p className="text-[18px] opacity-75 mt-8 leading-8">Order ID: <br></br><span className="font-medium">{data?.order_id}</span></p>
                                <p className="text-[18px] opacity-75">Customer Name: <span className="font-medium">{data?.user?.username}</span></p>
                                <p className="text-[18px] opacity-75">Order Date: <span className="font-medium">{`${new Date(data?.time).getMonth() + 1}-${new Date(data?.time).getDate()}-${new Date(data?.time).getFullYear()}`}</span></p>
                                <p className="text-[18px] opacity-75">Total Amount: <span className="font-bold text-[#3d7051]">₹{data?.price?.grandPrice}</span></p>
                            </div>
                        </div>

                        {/* Footer */}
                        <span className='inline-flex flex-col items-center gap-5'>
                            <button onClick={() => downloadInvoice(data)} className='mt-4 px-6 py-2 bg-[#657a6d] text-white rounded-full flex gap-5'>
                                <i className='ri-download-line font-bold'></i>
                                Download Invoice</button>
                            <p className='px-40 text-center'>Download Invoice in PDF,  Its may help you to track your order, and it help you to reduce the confusion in feature about the amount and further details</p>
                        </span>



                        <div className="text-sm bg-[linear-gradient(45deg,#50a05520,#3d705120)] p-6 rounded-[30px] flex">
                            <div className="space-y-1 opacity-75 flex gap-12">

                                <span>
                                    <p className="font-bold text-[18px] mb-3 text-[#3d7051]">Delivery Address</p>
                                    <p>{`${data?.delivery_address?.FirstName} ${data?.delivery_address?.LastName}`}</p>
                                    <p>{data?.delivery_address?.streetAddress}</p>
                                    <p>{data?.delivery_address?.landmark}</p>
                                    <p>{data?.delivery_address?.city}</p>
                                </span>
                                <span>
                                    <p>&nbsp;</p>
                                    <p>{data?.delivery_address?.state}</p>
                                    <p>Pincode: {data?.delivery_address?.pincode}</p>
                                    <p>Phone: {data?.delivery_address?.phone}</p>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto rounded-[30px]">
                        <table className="w-full text-[17px]">
                            <thead>
                                <tr className="px-40 bg-[linear-gradient(45deg,#50a05599,#657a6d)] text-white">
                                    <th className="py-4 px-6 text-left rounded-tl-[30px] pl-20">Item</th>
                                    <th className="py-4 px-6 text-left">Quantity</th>
                                    <th className="py-4 px-6 text-left">Price</th>
                                    <th className="py-4 px-6 text-left rounded-tr-[30px]">Discount Price</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white text-[17px]">
                                {
                                    data?.items?.map((item, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50 duration-300">
                                            <td className="py-4 px-6 pl-20 ">{item.product.name}</td>
                                            <td className="py-4 px-6">{item.quantity / 1000} KG</td>
                                            <td className="py-4 px-6">₹{item.product.regularPrice * (item.quantity / 1000)}</td>
                                            <td className="py-4 px-6">₹{
                                                ((data.price?.discountPrice) / data.items.length || 0)}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>

                    {/* Summary */}
                    <div className="mt-8 bg-[linear-gradient(45deg,#50a05510,#3d705110)] p-6 rounded-[30px]">
                        <h2 className="font-bold text-[20px] mb-4 text-[#3d7051]">Summary</h2>
                        <div className="space-y-2 text-[16px]">
                            <div className="flex justify-between items-center">
                                <span className="opacity-75">Totel for Products</span>
                                <span className="font-medium">₹{data?.price?.others.totel.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="opacity-75">Delivery Charge</span>
                                <span className="font-medium">₹{data?.price?.others.delivery.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="opacity-75">Tax amount</span>
                                <span className="font-medium">₹{data?.price?.others.tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="opacity-75">Discount Amount</span>
                                <span className="font-medium">₹{data?.price?.discountPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t">
                                <span className="font-bold text-[18px]">Total Amount</span>
                                <span className="font-bold text-[20px] text-[#3d7051]">₹{data?.price?.grandPrice}</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-center mt-8 text-[16px] opacity-75">Thank you for shopping with us!</p>
                </div>
            </div>
        </div>
    );
};

export default Invoice;