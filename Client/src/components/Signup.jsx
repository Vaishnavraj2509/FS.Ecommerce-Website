import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  signupStart, 
  signupSuccess, 
  signupFailure, 
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
  resendOtpStart,
  resendOtpSuccess,
  resendOtpFailure,
  clearError 
} from '@/store/slices/authSlice'
import { X, Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react'

const Signup = ({ isOpen, onClose, onSwitchToLogin }) => {
  const dispatch = useDispatch()
  const { loading, error, otpSent, emailForOtp, isVerifyingOtp } = useSelector(state => state.auth)
  
  const [step, setStep] = useState('signup') // 'signup' or 'otp'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [otpTimer, setOtpTimer] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
      setOtp(['', '', '', '', '', ''])
      setFormErrors({})
      setStep('signup')
      dispatch(clearError())
    }
  }, [isOpen, dispatch])

  useEffect(() => {
    if (otpSent) {
      setStep('otp')
      setOtpTimer(60)
    }
  }, [otpSent])

  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [otpTimer])

  const validateSignupForm = () => {
    const errors = {}
    
    if (!formData.name) {
      errors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid'
    }
    
    if (!formData.phone) {
      errors.phone = 'Phone number is required'
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Phone number must be 10 digits'
    }
    
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required'
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateSignupForm()) return

    dispatch(signupStart())

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock successful signup - send OTP
      dispatch(signupSuccess({ email: formData.email }))
    } catch (err) {
      dispatch(signupFailure('Failed to create account. Please try again.'))
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    
    const otpValue = otp.join('')
    if (otpValue.length !== 6) {
      dispatch(verifyOtpFailure('Please enter complete OTP'))
      return
    }

    dispatch(verifyOtpStart())

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock successful OTP verification
      if (otpValue === '123456') { // Mock OTP for demo
        const mockUser = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          avatar: `https://ui-avatars.com/api/?name=${formData.name}&background=0D8ABC&color=fff`
        }
        
        dispatch(verifyOtpSuccess({
          user: mockUser,
          token: 'mock_jwt_token_' + Date.now()
        }))
        
        onClose()
      } else {
        dispatch(verifyOtpFailure('Invalid OTP. Please try again.'))
      }
    } catch (err) {
      dispatch(verifyOtpFailure('Failed to verify OTP. Please try again.'))
    }
  }

  const handleResendOtp = async () => {
    dispatch(resendOtpStart())
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      dispatch(resendOtpSuccess())
      setOtpTimer(60)
      setOtp(['', '', '', '', '', ''])
    } catch (err) {
      dispatch(resendOtpFailure('Failed to resend OTP'))
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      
      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
    }
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-lg max-h-[90vh] overflow-y-auto">
        <Card className="border-0 rounded-lg">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">
                {step === 'signup' ? 'Sign up for ShopZone' : 'Verify Your Email'}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {step === 'signup' ? (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`pl-10 ${formErrors.name ? 'border-red-500' : ''}`}
                      disabled={loading}
                    />
                  </div>
                  {formErrors.name && (
                    <p className="text-xs text-red-500">{formErrors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`pl-10 ${formErrors.email ? 'border-red-500' : ''}`}
                      disabled={loading}
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-xs text-red-500">{formErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`pl-10 ${formErrors.phone ? 'border-red-500' : ''}`}
                      disabled={loading}
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-xs text-red-500">{formErrors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`pl-10 pr-10 ${formErrors.password ? 'border-red-500' : ''}`}
                      disabled={loading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {formErrors.password && (
                    <p className="text-xs text-red-500">{formErrors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`pl-10 pr-10 ${formErrors.confirmPassword ? 'border-red-500' : ''}`}
                      disabled={loading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {formErrors.confirmPassword && (
                    <p className="text-xs text-red-500">{formErrors.confirmPassword}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>

                <div className="text-center">
                  <span className="text-sm text-gray-600">Already have an account? </span>
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 h-auto text-sm"
                    onClick={onSwitchToLogin}
                  >
                    Login
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">
                    We've sent a 6-digit verification code to
                  </p>
                  <p className="font-medium">{emailForOtp}</p>
                  <p className="text-xs text-gray-500">
                    For demo purposes, use: <Badge>123456</Badge>
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-center space-x-2">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-12 text-center text-lg font-bold"
                        maxLength={1}
                        disabled={isVerifyingOtp}
                      />
                    ))}
                  </div>

                  {otpTimer > 0 ? (
                    <p className="text-center text-sm text-gray-500">
                      Resend OTP in {otpTimer} seconds
                    </p>
                  ) : (
                    <div className="text-center">
                      <Button
                        type="button"
                        variant="link"
                        onClick={handleResendOtp}
                        disabled={loading}
                      >
                        Resend OTP
                      </Button>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isVerifyingOtp || otp.join('').length !== 6}
                >
                  {isVerifyingOtp ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    'Verify & Create Account'
                  )}
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm"
                    onClick={() => {
                      setStep('signup')
                      dispatch(clearError())
                    }}
                  >
                    ← Back to signup
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Signup