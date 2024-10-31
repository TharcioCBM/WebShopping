import { Info, Phone, Lock } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-col items-center mb-4">
              <Info className="w-8 h-8 text-gray-700" />
              <h2 className="text-xl font-semibold mt-2">Sobre</h2>
            </div>
            <p className="text-sm text-gray-600">
              Este site foi desenvolvido para fins acadêmicos, sem fins
              lucrativos, com o objetivo de demonstrar os conhecimentos
              adquiridos na disciplina de Programação Web, do curso de
              Ciência da Computação, Campus VII - UEPB.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-col items-center mb-4">
              <Phone className="w-8 h-8 text-gray-700" />
              <h2 className="text-xl font-semibold mt-2">Contato</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Entre em contato conosco para dúvidas, sugestões ou
              suporte através do e-mail webshopping@email.com.
              Estamos à disposição para ajudá-lo e responderemos o
              mais breve possível!
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Além disso, acompanhe nossas novidades e promoções
              nas redes sociais:
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-blue-600 hover:underline">Facebook</Link>
              <Link href="#" className="text-blue-600 hover:underline">Instagram</Link>
              <Link href="#" className="text-blue-600 hover:underline">Twitter</Link>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-col items-center mb-4">
              <Lock className="w-8 h-8 text-gray-700" />
              <h2 className="text-xl font-semibold mt-2">Política de Privacidade</h2>
            </div>
            <p className="text-sm text-gray-600">
              Sua privacidade é importante para nós. Saiba como
              coletamos, utilizamos e protegemos seus dados
              acessando nossa{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Política de Privacidade
              </Link>
              .
            </p>
          </div>
          
        </div>
      </div>
    </footer>
  )
}
