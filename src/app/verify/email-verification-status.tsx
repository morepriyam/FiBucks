
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface EmailVerificationStatusProps {
  status: 'loading' | 'success' | 'error'
  message: string
}

export function EmailVerificationStatus({ status, message }: EmailVerificationStatusProps) {
  return (
    <div className="flex flex-col items-center space-y-4 text-center">
      {status === 'loading' && (
        <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
      )}
      {status === 'success' && (
        <CheckCircle className="h-16 w-16 text-green-500" />
      )}
      {status === 'error' && (
        <XCircle className="h-16 w-16 text-red-500" />
      )}
      <p className="text-lg font-medium">
        {message}
      </p>
      {status === 'success' && (
        <p className="text-sm text-gray-500">
          Redirecting to dashboard...
        </p>
      )}
    </div>
  )
}

