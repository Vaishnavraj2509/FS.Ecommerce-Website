import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  clearError 
} from '@/store/slices/authSlice'
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react'

const ForgotPassword = ({ isOpen, onClose, onSwitchToLogin }) => {
  const dispatch = useDispatch()
  const { loading, error, resetPasswordOtpSent, resetPasswordEmail, isResettingPassword } = useSelector(state => state.auth)
  
  const [step, setStep] = useState('email') // 'email', 'otp', 'reset'
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [otpTimer, setOtpTimer] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setEmail('')
      setOtp(['', '', '', '', '', ''])
      setNewPassword('')
      setConfirmPassword('')
      setFormErrors({})
      setStep('email')
      dispatch(clearError())
    }
  }, [isOpen, dispatch])

  useEffect(() => {
    if (resetPasswordOtpSent) {
      setStep('otp')
      setOtpTimer(60)
    }
  }, [resetPasswordOtpSent])

  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [otpTimer])

  const validateEmail = () => {
    const errors = {}
    
    if (!email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validatePasswordReset = () => {
    const errors = {}
    
    if (!newPassword) {
      errors.newPassword = 'New password is required'
    } else if (newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters'
    }
    
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm password is required'
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateEmail()) return

    dispatch(forgotPasswordStart())

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock successful forgot password request
      dispatch(forgotPasswordSuccess({ email }))
    } catch (err) {
      dispatch(forgotPasswordFailure('Failed to send reset email. Please try again.'))
    }
  }

  const handleOtpVerify = (e) => {
    e.preventDefault()
    
    const otpValue = otp.join('')
    if (otpValue.length !== 6) {
      setFormErrors({ otp: 'Please enter complete OTP' })
      return
    }

    // Mock OTP verification for forgot password
    if (otpValue === '654321') { // Different mock OTP for password reset
      setStep('reset')
      setFormErrors({})
    } else {
      setFormErrors({ otp: 'Invalid OTP. Please try again.' })
    }
  }

  const handlePasswordReset = async (e) => {
    e.preventDefault()
    
    if (!validatePasswordReset()) return

    dispatch(resetPasswordStart())

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock successful password reset
      dispatch(resetPasswordSuccess())
      
      // Show success message and redirect to login
      setTimeout(() => {
        onClose()
        onSwitchToLogin()
      }, 2000)
    } catch (err) {
      dispatch(resetPasswordFailure('Failed to reset password. Please try again.'))
    }
  }

  const handleResendOtp = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setOtpTimer(60)
      setOtp(['', '', '', '', '', ''])
      setFormErrors({})
    } catch (err) {
      setFormErrors({ otp: 'Failed to resend OTP' })
    }
  }

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      
      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`reset-otp-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
    }
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`reset-otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  if (!isOpen) return null

  const getStepTitle = () => {
    switch (step) {
      case 'email': return 'Forgot Password'
      case 'otp': return 'Verify Email'
      case 'reset': return 'Reset Password'
      default: return 'Forgot Password'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-lg">
        <Card className="border-0 rounded-lg">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{getStepTitle()}</CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {step === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-sm text-gray-600 mb-4">
                    Enter your email address and we'll send you a verification code to reset your password.
                  </p>
                  
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (formErrors.email) setFormErrors({})
                      }}
                      className={`pl-10 ${formErrors.email ? 'border-red-500' : ''}`}
                      disabled={loading}
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-xs text-red-500">{formErrors.email}</p>
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
                      Sending...
                    </div>
                  ) : (
                    'Send Verification Code'
                  )}
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm"
                    onClick={onSwitchToLogin}
                  >
                    ← Back to Login
                  </Button>
                </div>
              </form>
            )}

            {step === 'otp' && (
              <form onSubmit={handleOtpVerify} className="space-y-6">
                {formErrors.otp && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{formErrors.otp}</p>
                  </div>
                )}

                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">
                    We've sent a 6-digit verification code to
                  </p>
                  <p className="font-medium">{resetPasswordEmail}</p>
                  <p className="text-xs text-gray-500">
                    For demo purposes, use: <Badge>654321</Badge>
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-center space-x-2">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        id={`reset-otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-12 text-center text-lg font-bold"
                        maxLength={1}
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
                  disabled={otp.join('').length !== 6}
                >
                  Verify Code
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm"
                    onClick={() => {
                      setStep('email')
                      setFormErrors({})
                    }}
                  >
                    ← Change Email Address
                  </Button>
                </div>
              </form>
            )}

            {step === 'reset' && (
              <form onSubmit={handlePasswordReset} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {!error && isResettingPassword && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-600">Password reset successful! Redirecting to login...</p>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-sm text-gray-600 mb-4">
                    Create a new password for your account.
                  </p>
                  
                  <label className="text-sm font-medium text-gray-700">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value)
                        if (formErrors.newPassword) {
                          setFormErrors(prev => ({ ...prev, newPassword: '' }))
                        }
                      }}
                      className={`pl-10 pr-10 ${formErrors.newPassword ? 'border-red-500' : ''}`}
                      disabled={isResettingPassword}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {formErrors.newPassword && (
                    <p className="text-xs text-red-500">{formErrors.newPassword}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        if (formErrors.confirmPassword) {
                          setFormErrors(prev => ({ ...prev, confirmPassword: '' }))
                        }
                      }}
                      className={`pl-10 pr-10 ${formErrors.confirmPassword ? 'border-red-500' : ''}`}
                      disabled={isResettingPassword}
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
                  disabled={isResettingPassword}
                >
                  {isResettingPassword ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Resetting Password...
                    </div>
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ForgotPassword