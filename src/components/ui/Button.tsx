import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseStyle = 'px-5 py-2.5 font-bold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 text-xs uppercase tracking-wider cursor-pointer'
  const variants = {
    primary: 'bg-[#ED1C24] hover:bg-[#D0171E] text-white focus:ring-[#ED1C24] shadow-md hover:shadow-red-500/20',
    secondary: 'bg-[#222222] hover:bg-[#333333] text-white focus:ring-[#222222] shadow-sm',
    outline: 'border border-[#ED1C24] text-[#ED1C24] hover:bg-red-50 focus:ring-[#ED1C24]'
  }

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
