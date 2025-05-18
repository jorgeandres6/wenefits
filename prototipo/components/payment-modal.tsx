"use client"

import type React from "react"

import { useState } from "react"
import { DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ISuccessResult, MiniKit, PayCommandInput, Tokens, tokenToDecimals, VerificationLevel, VerifyCommandInput } from "@worldcoin/minikit-js"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  businessName: string
  onPaymentComplete?: () => void
  initialAmount?: string
}

//INICIO DE PAGOS-----------------------------------------

const cantidadToSend: number = 0.1;

const sendPayment = async (amount:number) => {
  const res = await fetch('/api/initiate-payment', {
    method: 'POST',
  })
  const { id } = await res.json()

  const payload: PayCommandInput = {
    reference: id,
    to: '0x7e88fad60ac9a2d92696324df7ff15b9da09b243', // Test address
    tokens: [
      {
        symbol: Tokens.WLD,
        token_amount: tokenToDecimals(amount, Tokens.WLD).toString(),
      },
    ],
    description: 'Test example payment for minikit',
  }

  const { finalPayload } = await MiniKit.commandsAsync.pay(payload)

  if (finalPayload.status == 'success') {
    const res = await fetch(`/api/confirm-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalPayload),
    })
    const payment = await res.json()
    if (payment.success) {
      // Congrats your payment was successful!
      console.log("Pago realizado");
      //setIsPaid(true);
    }
  }
}

  //FIN DE PAGOS--------------------------------------------

  //INICIO DE VERIFICACION------------------------------------

  const verifyPayload: VerifyCommandInput = {
	action: 'pagar', // This is your action ID from the Developer Portal
	//signal: '0x12312', // Optional additional data
	verification_level: VerificationLevel.Orb, // Orb | Device
}

const handleVerify = async () => {
	if (!MiniKit.isInstalled()) {
		return
	}
	// World App will open a drawer prompting the user to confirm the operation, promise is resolved once user confirms or cancels
	const {finalPayload} = await MiniKit.commandsAsync.verify(verifyPayload)
		if (finalPayload.status === 'error') {
			return console.log('Error payload', finalPayload)
		}

		// Verify the proof in the backend
		const verifyResponse = await fetch('/api/verify-proof', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			payload: finalPayload as ISuccessResult, // Parses only the fields we need to verify
			action: 'pagar',
			//signal: '0x12312', // Optional
		}),
	})

	// TODO: Handle Success!
	const verifyResponseJson = await verifyResponse.json()
	if (verifyResponseJson.status === 200) {
		console.log('Verification success!')
    //setIsVerified(true);
	}
}

//FIN DE VERIFICACION------------------------------------------------------


export function PaymentModal({ 
  isOpen, onClose, businessName, onPaymentComplete, initialAmount = "0.1", }: PaymentModalProps) {
  const [amount, setAmount] = useState("0.1")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate payment processing
    /* setTimeout(() => {
      if (onPaymentComplete) onPaymentComplete()
      onClose()
    }, 500)  */

    //setIsPaid(false)
                //handleVerify();
    handleVerify().finally(() => sendPayment(parseFloat(amount)));
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pago a {businessName}</DialogTitle>
          <DialogDescription>Ingrese el monto a pagar en WLD a {businessName}.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Monto a pagarse</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Pagar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
