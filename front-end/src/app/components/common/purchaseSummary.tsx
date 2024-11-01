import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface PurchaseSummaryProps {
  discount: number
  total: number
  onCheckout: () => void
}

export function PurchaseSummary({  discount, total, onCheckout }: PurchaseSummaryProps) {
  return (
    <Card className="rounded-md bg-white">
      <CardContent className="p-6">
        <h2 className="text-2xl font-medium mb-6">Compra no total</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Desconto</span>
            <span className="text-green-600">- {discount} %</span>
          </div>
          
          <div className="flex justify-between items-center border-t pt-4">
            <span className="text-gray-600">Total</span>
            <span className="text-2xl font-bold">R$ {total.toFixed(2)}</span>
          </div>
        </div>

        <Button 
          className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white"
          onClick={onCheckout}
        >
          Continuar compra
        </Button>
      </CardContent>
    </Card>
  )
}