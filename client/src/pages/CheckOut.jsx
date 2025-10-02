import React, { useEffect, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { FaLocationDot } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { BiCurrentLocation } from "react-icons/bi";
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import 'leaflet/dist/leaflet.css';
import { setAddress, setLocation } from '../redux/mapSlice';
import axios from 'axios';
import { MdDeliveryDining } from "react-icons/md";
import { CiMobile3 } from "react-icons/ci";
import { FaRegCreditCard } from "react-icons/fa6";
import { serverUrl } from '../App';

// ✅ Map recenter
function RecenterMap({ location }) {
  const map = useMap()
  if (location.lat && location.lon) {
    map.setView([location.lat, location.lon], 16, { animate: true })
  }
  return null
}

// ✅ draggable marker
function DraggableMarker({ position, onDragEnd }) {
  const map = useMap()
  return (
    <Marker
      position={position}
      draggable
      eventHandlers={{
        dragend: (e) => {
          const { lat, lng } = e.target.getLatLng()
          map.setView([lat, lng], 16, { animate: true })
          onDragEnd(lat, lng)
        }
      }}
    />
  )
}

const CheckOut = () => {
  const navigate = useNavigate()
  const [addressInput, setAddressInput] = useState("");
  const { location, address } = useSelector(state => state.map)
  const { cartItems, totalAmount } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const apikey = import.meta.env.VITE_GEOAPIKEY;
  const [paymentMethod, setPaymentMethod] = useState("cod")

  const deliveryFee = totalAmount < 200 ? 50 : 0;
  const tax = totalAmount * 0.1;
  const grandTotal = totalAmount + deliveryFee + tax;


  
  // ✅ reverse geocode
  const getAddressByLatLng = async (lat, lng) => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apikey}`
      );
      dispatch(setAddress(result?.data?.results?.[0].address_line2));
    } catch (error) {
      console.log(error);
    }
  }

  // ✅ current location
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(setLocation({ lat: latitude, lon: longitude }))
      getAddressByLatLng(latitude, longitude)
    }, (error) => {
      console.error("Error getting current location:", error);
    });
  }

  // ✅ geocode by address
  const getlatlngByAddress = async () => {
    try {
      const result = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${apikey}`)
      const { lat, lon } = result?.data?.features[0].properties
      dispatch(setLocation({ lat, lon }))
      dispatch(setAddress(addressInput))
    } catch (error) {
      console.log(error)
    }
  }

  const handlePlaceOrder = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/order/placeorder`, {
        paymentMethod,
        deliveryAddress: {
          text: addressInput,
          latitude: location.lat,
          longitude: location.lon
        }, 
        totalAmount: grandTotal,
        cartItems
      }, { withCredentials: true })
     navigate("/order-placed")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setAddressInput(address)
  }, [address])

  const handleDragEnd = (lat, lng) => {
    dispatch(setLocation({ lat, lon: lng }))
    getAddressByLatLng(lat, lng)
  }

  return (
    <div className="min-h-screen bg-[#fff9f6] flex items-center justify-center ">
      <div className="w-full sm:max-w-[900px] bg-[#fff9f6]  p-6 space-y-8 ">

        {/* Header */}
        <div className="flex gap-4 items-center">
          <IoArrowBack onClick={() => navigate("/cart")} size={35} className="text-[#ff4d2d] cursor-pointer " />
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>

        {/* Delivery Section */}
        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <FaLocationDot className="text-[#ff4d2d]" /> Delivery Location
          </h2>
          <div className="flex-1 gap-2 mb-4 flex">
            <input
              onChange={(e) => setAddressInput(e.target.value)}
              value={addressInput}
              type="text"
              placeholder="Enter delivery address"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
            />
            <button onClick={getlatlngByAddress} className="bg-[#ff4d2d] hover:bg-[#e64526] text-white px-4 py-2 rounded-xl flex items-center justify-center shadow-md">
              <IoSearchOutline size={18} />
            </button>
            <button onClick={getCurrentLocation} className="text-gray-800 border border-gray-300 px-4 py-2 rounded-xl flex items-center justify-center shadow-md hover:bg-gray-100">
              <BiCurrentLocation size={20} />
            </button>
          </div>
          <div className="rounded-2xl overflow-hidden border shadow-md">
            <div className="h-64 w-full">
              <MapContainer
                className="w-full h-full"
                center={[location?.lat, location?.lon]}
                zoom={16}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                touchZoom={false}
                dragging={true} // marker draggable but no accidental scroll
              >
                <RecenterMap location={location} />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <DraggableMarker position={[location?.lat, location?.lon]} onDragEnd={handleDragEnd} />
              </MapContainer>
            </div>
          </div>
        </section>

        {/* Payment Section */}
        <section>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Payment Method</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            {/* COD */}
            <div onClick={() => setPaymentMethod("cod")}
              className={`flex items-center gap-3 rounded-2xl p-5 cursor-pointer  transition-all ${paymentMethod === "cod" ? "border border-[#ff4d2d] bg-orange-50" : "border border-gray-200 hover:border-[#ff4d2d]/50"}`}>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700 text-xl">
                <MdDeliveryDining />
              </span>
              <div>
                <p className="font-semibold text-gray-900">Cash On Delivery</p>
                <p className="text-xs text-gray-500">Pay when your food arrives</p>
              </div>
            </div>

            {/* Online */}
            <div onClick={() => setPaymentMethod("online")}
              className={`flex items-center gap-3 rounded-2xl p-5 cursor-pointer shadow-md transition-all ${paymentMethod === "online" ? "border border-[#ff4d2d] bg-orange-50" : "border border-gray-200 hover:border-[#ff4d2d]/50"}`}>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-200 text-purple-700 text-xl">
                <CiMobile3 />
              </span>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 text-blue-700 text-xl">
                <FaRegCreditCard />
              </span>
              <div>
                <p className="font-semibold text-gray-900">UPI / Card Payment</p>
                <p className="text-xs text-gray-500">Pay securely online</p>
              </div>
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <section>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Order Summary</h2>
          <div className="rounded-2xl border bg-gray-50 p-5 space-y-2 shadow-sm">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-gray-700">
                <p>{item.name} × {item.quantity}</p>
                <p className="font-medium text-gray-900">₹{item.price * item.quantity}</p>
              </div>
            ))}
            <hr className="border-gray-200 my-2" />
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Items Total</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Tax (10%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Delivery</span>
              <span>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-[#ff4d2d] pt-2">
              <span>Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </section>

        {/* CTA Button */}
        <div className="sm:text-right sm:mt-4">
          <button onClick={handlePlaceOrder} className="w-full sm:w-[200px] bg-[#ff4d2d] hover:bg-[#e64526] text-white py-3 rounded-xl text-lg font-semibold shadow-lg transition">
            {paymentMethod === "cod" ? "Place Order" : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckOut
