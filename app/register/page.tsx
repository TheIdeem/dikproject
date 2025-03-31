"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import { IoFootball } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { UserAccount } from '../utils/accountsDB';
import { useAuth } from '../context/AuthContext';

// Captcha component that generates and displays a random code
const Captcha = ({ onChange }: { onChange: (value: string) => void }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isValid, setIsValid] = useState(false);

  // Generate random captcha text
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput('');
    setIsValid(false);
    onChange('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    const valid = value === captchaText;
    setIsValid(valid);
    onChange(valid ? captchaText : '');
  };

  // Canvas to draw the captcha
  const CaptchaCanvas = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background
      ctx.fillStyle = '#1a2538';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add noise (dots)
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
        ctx.beginPath();
        ctx.arc(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      
      // Add lines
      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
      }
      
      // Draw captcha text
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = '#54c6ff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Draw each character with slight rotation for more security
      const textWidth = ctx.measureText(captchaText).width;
      const startX = (canvas.width - textWidth) / 2 + 15;
      
      for (let i = 0; i < captchaText.length; i++) {
        const charWidth = ctx.measureText(captchaText[i]).width;
        const x = startX + i * charWidth + 10;
        const y = canvas.height / 2;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((Math.random() - 0.5) * 0.5);
        ctx.fillText(captchaText[i], 0, 0);
        ctx.restore();
      }
      
    }, [captchaText]);

    return (
      <canvas 
        ref={canvasRef} 
        width={250} 
        height={60} 
        className="rounded border border-[#2c3e50]"
      />
    );
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center">
        <CaptchaCanvas />
        <button
          type="button"
          onClick={generateCaptcha}
          className="ml-2 p-2 bg-[#0095d8] text-white rounded"
          aria-label="Refresh captcha"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      <input 
        type="text" 
        placeholder="Enter the code shown above" 
        value={userInput}
        onChange={handleInputChange}
        className={`w-full p-3 rounded bg-[#1a2538] border ${isValid ? 'border-green-500' : 'border-[#2c3e50]'} text-white`}
      />
    </div>
  );
};

export default function Register() {
  const router = useRouter();
  const { register, isAuthenticated } = useAuth();
  const [captchaValid, setCaptchaValid] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cellPhone: '',
    countryCode: '+90 ( TR - Turkey )', // Default country code
    username: '',
    password: '',
    passwordRepeat: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleCaptchaChange = (value: string) => {
    setCaptchaValid(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error message when user types
    setErrorMessage('');
  };

  // Handle select change for country code
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      countryCode: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error
    setErrorMessage('');
    
    // Check if captcha is valid
    if (!captchaValid) {
      setErrorMessage('Please enter the correct captcha code');
      return;
    }
    
    // Check if passwords match
    if (formData.password !== formData.passwordRepeat) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Check if username is long enough
    if (formData.username.length < 5) {
      setErrorMessage('Username must be at least 5 characters');
      return;
    }

    // Check if password is long enough
    if (formData.password.length < 4) {
      setErrorMessage('Password must be at least 4 characters');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create user account object
      const newAccount: UserAccount = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        cellPhone: formData.cellPhone,
        countryCode: formData.countryCode,
        username: formData.username,
        password: formData.password
      };
      
      // Try to register using the register function from AuthContext
      const success = await register(newAccount);
      
      if (success) {
        // Show success message - redirect will be handled by the useEffect
        alert('Account created successfully!');
      } else {
        // Show error message
        setErrorMessage('Username already exists. Please choose another one.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1a2538] bg-opacity-80 bg-[url('/bg-pattern.jpg')] bg-cover overflow-y-auto pb-16">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-[#1a2538]">
        <button className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex-1 flex justify-center">
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="KurdBetDax Logo" 
              width={150} 
              height={40} 
              className="object-contain cursor-pointer"
            />
          </Link>
        </div>
        <button className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </header>

      {/* Back button and title */}
      <div className="flex items-center px-4 py-2">
        <Link href="/" className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-white text-lg font-medium mx-auto">Register</h1>
      </div>

      {/* Form container */}
      <form onSubmit={handleSubmit} className="flex-1 p-4 pb-28">
        <p className="text-[#54c6ff] text-sm mb-4">
          Please fill in all fields with complete and accurate information. Payment and withdrawal transactions are made according to the information provided on the membership form.
        </p>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 text-white rounded">
            {errorMessage}
          </div>
        )}

        {/* Personal Information section */}
        <div className="mb-8">
          <h2 className="text-[#54c6ff] font-semibold mb-3">Personal Information</h2>
          
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-white mb-1">First Name*</label>
            <input 
              type="text" 
              id="firstName" 
              placeholder="First Name" 
              className="w-full p-3 rounded bg-[#1a2538] border border-[#2c3e50] text-white"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-white mb-1">Last Name*</label>
            <input 
              type="text" 
              id="lastName" 
              placeholder="Last Name" 
              className="w-full p-3 rounded bg-[#1a2538] border border-[#2c3e50] text-white"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Contact Information section */}
        <div className="mb-8">
          <h2 className="text-[#54c6ff] font-semibold mb-3">Contact Information</h2>
          
          <div className="mb-4">
            <label htmlFor="cellPhone" className="block text-white mb-1">Cell Phone *</label>
            <div className="flex">
              <select 
                className="p-3 rounded-l bg-[#1a2538] border border-[#2c3e50] text-white w-1/3 overflow-y-auto"
                value={formData.countryCode}
                onChange={handleSelectChange}
              >
                <option>+93 ( AF - Afghanistan )</option>
                <option>+355 ( AL - Albania )</option>
                <option>+213 ( DZ - Algeria )</option>
                <option>+1684 ( AS - American Samoa )</option>
                <option>+376 ( AD - Andorra )</option>
                <option>+244 ( AO - Angola )</option>
                <option>+1264 ( AI - Anguilla )</option>
                <option>+672 ( AQ - Antarctica )</option>
                <option>+1268 ( AG - Antigua and Barbuda )</option>
                <option>+54 ( AR - Argentina )</option>
                <option>+374 ( AM - Armenia )</option>
                <option>+297 ( AW - Aruba )</option>
                <option>+61 ( AU - Australia )</option>
                <option>+43 ( AT - Austria )</option>
                <option>+994 ( AZ - Azerbaijan )</option>
                <option>+1242 ( BS - Bahamas )</option>
                <option>+973 ( BH - Bahrain )</option>
                <option>+880 ( BD - Bangladesh )</option>
                <option>+1246 ( BB - Barbados )</option>
                <option>+375 ( BY - Belarus )</option>
                <option>+32 ( BE - Belgium )</option>
                <option>+501 ( BZ - Belize )</option>
                <option>+229 ( BJ - Benin )</option>
                <option>+1441 ( BM - Bermuda )</option>
                <option>+975 ( BT - Bhutan )</option>
                <option>+591 ( BO - Bolivia )</option>
                <option>+387 ( BA - Bosnia and Herzegovina )</option>
                <option>+267 ( BW - Botswana )</option>
                <option>+55 ( BR - Brazil )</option>
                <option>+246 ( IO - British Indian Ocean Territory )</option>
                <option>+673 ( BN - Brunei Darussalam )</option>
                <option>+359 ( BG - Bulgaria )</option>
                <option>+226 ( BF - Burkina Faso )</option>
                <option>+257 ( BI - Burundi )</option>
                <option>+855 ( KH - Cambodia )</option>
                <option>+237 ( CM - Cameroon )</option>
                <option>+1 ( CA - Canada )</option>
                <option>+238 ( CV - Cape Verde )</option>
                <option>+1345 ( KY - Cayman Islands )</option>
                <option>+236 ( CF - Central African Republic )</option>
                <option>+235 ( TD - Chad )</option>
                <option>+56 ( CL - Chile )</option>
                <option>+86 ( CN - China )</option>
                <option>+61 ( CX - Christmas Island )</option>
                <option>+57 ( CO - Colombia )</option>
                <option>+269 ( KM - Comoros )</option>
                <option>+242 ( CG - Congo )</option>
                <option>+243 ( CD - Congo, DR )</option>
                <option>+682 ( CK - Cook Islands )</option>
                <option>+506 ( CR - Costa Rica )</option>
                <option>+225 ( CI - Cote D'Ivoire )</option>
                <option>+385 ( HR - Croatia )</option>
                <option>+53 ( CU - Cuba )</option>
                <option>+357 ( CY - Cyprus )</option>
                <option>+420 ( CZ - Czech Republic )</option>
                <option>+45 ( DK - Denmark )</option>
                <option>+253 ( DJ - Djibouti )</option>
                <option>+1767 ( DM - Dominica )</option>
                <option>+1809 ( DO - Dominican Republic )</option>
                <option>+593 ( EC - Ecuador )</option>
                <option>+20 ( EG - Egypt )</option>
                <option>+503 ( SV - El Salvador )</option>
                <option>+240 ( GQ - Equatorial Guinea )</option>
                <option>+291 ( ER - Eritrea )</option>
                <option>+372 ( EE - Estonia )</option>
                <option>+251 ( ET - Ethiopia )</option>
                <option>+500 ( FK - Falkland Islands )</option>
                <option>+298 ( FO - Faroe Islands )</option>
                <option>+679 ( FJ - Fiji )</option>
                <option>+358 ( FI - Finland )</option>
                <option>+33 ( FR - France )</option>
                <option>+594 ( GF - French Guiana )</option>
                <option>+689 ( PF - French Polynesia )</option>
                <option>+241 ( GA - Gabon )</option>
                <option>+220 ( GM - Gambia )</option>
                <option>+995 ( GE - Georgia )</option>
                <option>+49 ( DE - Germany )</option>
                <option>+233 ( GH - Ghana )</option>
                <option>+350 ( GI - Gibraltar )</option>
                <option>+30 ( GR - Greece )</option>
                <option>+299 ( GL - Greenland )</option>
                <option>+1473 ( GD - Grenada )</option>
                <option>+590 ( GP - Guadeloupe )</option>
                <option>+1671 ( GU - Guam )</option>
                <option>+502 ( GT - Guatemala )</option>
                <option>+224 ( GN - Guinea )</option>
                <option>+245 ( GW - Guinea-Bissau )</option>
                <option>+592 ( GY - Guyana )</option>
                <option>+509 ( HT - Haiti )</option>
                <option>+39 ( VA - Holy See (Vatican City State) )</option>
                <option>+504 ( HN - Honduras )</option>
                <option>+852 ( HK - Hong Kong )</option>
                <option>+36 ( HU - Hungary )</option>
                <option>+354 ( IS - Iceland )</option>
                <option>+91 ( IN - India )</option>
                <option>+62 ( ID - Indonesia )</option>
                <option>+98 ( IR - Iran )</option>
                <option>+964 ( IQ - Iraq )</option>
                <option>+353 ( IE - Ireland )</option>
                <option>+972 ( IL - Israel )</option>
                <option>+39 ( IT - Italy )</option>
                <option>+1876 ( JM - Jamaica )</option>
                <option>+81 ( JP - Japan )</option>
                <option>+962 ( JO - Jordan )</option>
                <option>+7 ( KZ - Kazakhstan )</option>
                <option>+254 ( KE - Kenya )</option>
                <option>+686 ( KI - Kiribati )</option>
                <option>+850 ( KP - Korea, North )</option>
                <option>+82 ( KR - Korea, South )</option>
                <option>+965 ( KW - Kuwait )</option>
                <option>+996 ( KG - Kyrgyzstan )</option>
                <option>+856 ( LA - Laos )</option>
                <option>+371 ( LV - Latvia )</option>
                <option>+961 ( LB - Lebanon )</option>
                <option>+266 ( LS - Lesotho )</option>
                <option>+231 ( LR - Liberia )</option>
                <option>+218 ( LY - Libya )</option>
                <option>+423 ( LI - Liechtenstein )</option>
                <option>+370 ( LT - Lithuania )</option>
                <option>+352 ( LU - Luxembourg )</option>
                <option>+853 ( MO - Macao )</option>
                <option>+389 ( MK - North Macedonia )</option>
                <option>+261 ( MG - Madagascar )</option>
                <option>+265 ( MW - Malawi )</option>
                <option>+60 ( MY - Malaysia )</option>
                <option>+960 ( MV - Maldives )</option>
                <option>+223 ( ML - Mali )</option>
                <option>+356 ( MT - Malta )</option>
                <option>+692 ( MH - Marshall Islands )</option>
                <option>+596 ( MQ - Martinique )</option>
                <option>+222 ( MR - Mauritania )</option>
                <option>+230 ( MU - Mauritius )</option>
                <option>+262 ( YT - Mayotte )</option>
                <option>+52 ( MX - Mexico )</option>
                <option>+691 ( FM - Micronesia )</option>
                <option>+373 ( MD - Moldova )</option>
                <option>+377 ( MC - Monaco )</option>
                <option>+976 ( MN - Mongolia )</option>
                <option>+382 ( ME - Montenegro )</option>
                <option>+1664 ( MS - Montserrat )</option>
                <option>+212 ( MA - Morocco )</option>
                <option>+258 ( MZ - Mozambique )</option>
                <option>+95 ( MM - Myanmar )</option>
                <option>+264 ( NA - Namibia )</option>
                <option>+674 ( NR - Nauru )</option>
                <option>+977 ( NP - Nepal )</option>
                <option>+31 ( NL - Netherlands )</option>
                <option>+687 ( NC - New Caledonia )</option>
                <option>+64 ( NZ - New Zealand )</option>
                <option>+505 ( NI - Nicaragua )</option>
                <option>+227 ( NE - Niger )</option>
                <option>+234 ( NG - Nigeria )</option>
                <option>+683 ( NU - Niue )</option>
                <option>+672 ( NF - Norfolk Island )</option>
                <option>+1670 ( MP - Northern Mariana Islands )</option>
                <option>+47 ( NO - Norway )</option>
                <option>+968 ( OM - Oman )</option>
                <option>+92 ( PK - Pakistan )</option>
                <option>+680 ( PW - Palau )</option>
                <option>+970 ( PS - Palestine )</option>
                <option>+507 ( PA - Panama )</option>
                <option>+675 ( PG - Papua New Guinea )</option>
                <option>+595 ( PY - Paraguay )</option>
                <option>+51 ( PE - Peru )</option>
                <option>+63 ( PH - Philippines )</option>
                <option>+48 ( PL - Poland )</option>
                <option>+351 ( PT - Portugal )</option>
                <option>+1787 ( PR - Puerto Rico )</option>
                <option>+974 ( QA - Qatar )</option>
                <option>+262 ( RE - Reunion )</option>
                <option>+40 ( RO - Romania )</option>
                <option>+7 ( RU - Russia )</option>
                <option>+250 ( RW - Rwanda )</option>
                <option>+590 ( BL - Saint Barthelemy )</option>
                <option>+290 ( SH - Saint Helena )</option>
                <option>+1869 ( KN - Saint Kitts and Nevis )</option>
                <option>+1758 ( LC - Saint Lucia )</option>
                <option>+590 ( MF - Saint Martin )</option>
                <option>+508 ( PM - Saint Pierre and Miquelon )</option>
                <option>+1784 ( VC - Saint Vincent and the Grenadines )</option>
                <option>+685 ( WS - Samoa )</option>
                <option>+378 ( SM - San Marino )</option>
                <option>+239 ( ST - Sao Tome and Principe )</option>
                <option>+966 ( SA - Saudi Arabia )</option>
                <option>+221 ( SN - Senegal )</option>
                <option>+381 ( RS - Serbia )</option>
                <option>+248 ( SC - Seychelles )</option>
                <option>+232 ( SL - Sierra Leone )</option>
                <option>+65 ( SG - Singapore )</option>
                <option>+421 ( SK - Slovakia )</option>
                <option>+386 ( SI - Slovenia )</option>
                <option>+677 ( SB - Solomon Islands )</option>
                <option>+252 ( SO - Somalia )</option>
                <option>+27 ( ZA - South Africa )</option>
                <option>+211 ( SS - South Sudan )</option>
                <option>+34 ( ES - Spain )</option>
                <option>+94 ( LK - Sri Lanka )</option>
                <option>+249 ( SD - Sudan )</option>
                <option>+597 ( SR - Suriname )</option>
                <option>+268 ( SZ - Swaziland )</option>
                <option>+46 ( SE - Sweden )</option>
                <option>+41 ( CH - Switzerland )</option>
                <option>+963 ( SY - Syria )</option>
                <option>+886 ( TW - Taiwan )</option>
                <option>+992 ( TJ - Tajikistan )</option>
                <option>+255 ( TZ - Tanzania )</option>
                <option>+66 ( TH - Thailand )</option>
                <option>+670 ( TL - Timor-Leste )</option>
                <option>+228 ( TG - Togo )</option>
                <option>+690 ( TK - Tokelau )</option>
                <option>+676 ( TO - Tonga )</option>
                <option>+1868 ( TT - Trinidad and Tobago )</option>
                <option>+216 ( TN - Tunisia )</option>
                <option>+90 ( TR - Turkey )</option>
                <option>+993 ( TM - Turkmenistan )</option>
                <option>+1649 ( TC - Turks and Caicos Islands )</option>
                <option>+688 ( TV - Tuvalu )</option>
                <option>+256 ( UG - Uganda )</option>
                <option>+380 ( UA - Ukraine )</option>
                <option>+971 ( AE - United Arab Emirates )</option>
                <option>+44 ( GB - United Kingdom )</option>
                <option>+1 ( US - United States )</option>
                <option>+598 ( UY - Uruguay )</option>
                <option>+998 ( UZ - Uzbekistan )</option>
                <option>+678 ( VU - Vanuatu )</option>
                <option>+58 ( VE - Venezuela )</option>
                <option>+84 ( VN - Vietnam )</option>
                <option>+1284 ( VG - Virgin Islands, British )</option>
                <option>+1340 ( VI - Virgin Islands, U.S. )</option>
                <option>+681 ( WF - Wallis and Futuna )</option>
                <option>+967 ( YE - Yemen )</option>
                <option>+260 ( ZM - Zambia )</option>
                <option>+263 ( ZW - Zimbabwe )</option>
              </select>
              <input 
                type="tel" 
                id="cellPhone" 
                placeholder="Cell Phone" 
                className="w-2/3 p-3 rounded-r bg-[#1a2538] border border-[#2c3e50] border-l-0 text-white"
                value={formData.cellPhone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Account Info section */}
        <div className="mb-10">
          <h2 className="text-[#54c6ff] font-semibold mb-3">Account info</h2>
          
          <div className="mb-4">
            <label htmlFor="username" className="block text-white mb-1">User name (5-20 characters) *</label>
            <input 
              type="text" 
              id="username" 
              placeholder="User name (5-20 characters)" 
              className="w-full p-3 rounded bg-[#1a2538] border border-[#2c3e50] text-white"
              value={formData.username}
              onChange={handleInputChange}
              minLength={5}
              maxLength={20}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-white mb-1">Password (4-20 characters)*</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Password (4-20 characters)" 
              className="w-full p-3 rounded bg-[#1a2538] border border-[#2c3e50] text-white"
              value={formData.password}
              onChange={handleInputChange}
              minLength={4}
              maxLength={20}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="passwordRepeat" className="block text-white mb-1">Password (Repeat)*</label>
            <input 
              type="password" 
              id="passwordRepeat" 
              placeholder="Password (Repeat)" 
              className="w-full p-3 rounded bg-[#1a2538] border border-[#2c3e50] text-white"
              value={formData.passwordRepeat}
              onChange={handleInputChange}
              minLength={4}
              maxLength={20}
              required
            />
          </div>
          
          {/* Captcha */}
          <div className="mb-4">
            <label className="block text-white mb-1">Security Code*</label>
            <Captcha onChange={handleCaptchaChange} />
          </div>
        </div>

        {/* Submit button */}
        <button 
          type="submit" 
          className="w-full bg-[#0095d8] text-white py-3 rounded font-medium mb-20"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'CREATING ACCOUNT...' : 'CREATE MY ACCOUNT'}
        </button>
      </form>

      {/* Bottom Navigation - Updated to match other pages */}
      <nav className="bottom-nav fixed bottom-0 w-full bg-[#1a2538] flex justify-around py-3">
        <Link href="/" className="bottom-nav-item flex flex-col items-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3,12 L5,10 L12,3 L19,10 L21,12 L21,21 L3,21 L3,12 Z" stroke="#7fc9ff" fill="none" />
          </svg>
          <span className="text-xs mt-1 text-white">HOME PAGE</span>
        </Link>
        <Link href="/live-bets" className="bottom-nav-item flex flex-col items-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ff0000" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="5" stroke="#ff0000" strokeWidth="2" fill="none" />
          </svg>
          <span className="text-xs mt-1 text-white">LIVE</span>
        </Link>
        <Link href="/sport-bets" className="bottom-nav-item flex flex-col items-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
            <path d="M7,7 L17,17 M7,17 L17,7" stroke="white" strokeWidth="2" />
          </svg>
          <span className="text-xs mt-1 text-white">SPORTS</span>
        </Link>
        <Link href="/coupon" className="bottom-nav-item flex flex-col items-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="3" width="14" height="18" stroke="white" strokeWidth="2" fill="none" />
            <line x1="8" y1="8" x2="16" y2="8" stroke="white" strokeWidth="1" />
            <line x1="8" y1="12" x2="16" y2="12" stroke="white" strokeWidth="1" />
            <line x1="8" y1="16" x2="16" y2="16" stroke="white" strokeWidth="1" />
          </svg>
          <span className="text-xs mt-1 text-white">COUPON</span>
        </Link>
      </nav>
    </div>
  );
} 