"use client"; 

import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MiniKit, VerifyCommandInput, VerificationLevel, ISuccessResult, tokenToDecimals, Tokens, PayCommandInput } from '@worldcoin/minikit-js'
import { useEffect, useState } from 'react';
import { VerifyBlock } from "@/components/Verify";
//import { WalletAuth } from "@/components/WalletAuth";


export default function Home() {

  //INICIO DE PAGOS-----------------------------------------

const [isPaid, setIsPaid] = useState(false);

const sendPayment = async () => {
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
        token_amount: tokenToDecimals(0.1, Tokens.WLD).toString(),
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
      setIsPaid(true);
    }
  }
}

  //FIN DE PAGOS--------------------------------------------

  //INICIO DE VERIFICACION------------------------------------
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

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
    setIsVerified(true);
	}
}

//FIN DE VERIFICACION------------------------------------------------------

//console.log(MiniKit.isInstalled())

    return (
      <main className="flex min-h-screen flex-col items-center p-4">
        <div className="w-full max-w-md space-y-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Bienvenido a Wenefits</h1>
            <p className="mt-3 text-muted-foreground">Connect with businesses, support causes, or register your own</p>
          </div>

          <div className="mt-10 space-y-4">
            <Link href="/businesses" className="block w-full">
              <Button variant="default" size="lg" className="w-full h-16 text-lg">
                Comercios
              </Button>
            </Link>

            <Link href="/causes" className="block w-full">
              <Button variant="default" size="lg" className="w-full h-16 text-lg">
                Causas
              </Button>
            </Link>

            <Link href="/register" className="block w-full">
            <Button variant="outline" size="lg" className="w-full h-16 text-lg">
              Registra tu comercio o causa
            </Button>
          </Link>
          </div>
        </div>
      </main>
    )
}
