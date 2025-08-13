import MetaHeader from "@/components/MetaHeader";

export const metadata = {
  title: "Preguntas frecuentes | MyDrugs (proyecto fan)",
  description:
    "Preguntas frecuentes de un proyecto ficticio inspirado en una serie. No se realizan ventas reales ni se promueven actividades ilegales.",
};

export default function FAQPage() {
  return (
    <section className="relative isolate overflow-hidden py-12 pt-16 md:py-16">
      <div className="mx-auto max-w-4xl px-4">
        <MetaHeader
          title="Preguntas frecuentes"
          subtitle="Proyecto ficticio inspirado en una serie. No hay ventas reales ni instrucciones para cometer ilícitos."
          breadcrumb={["Home", "FAQ"]}
          className="mb-4"
          rainbowTitle
        />

        {/* Aviso de responsabilidad */}
        <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.035] p-4 ring-1 ring-white/10">
          <p className="text-sm leading-relaxed text-white/80">
            Este sitio es una demostración creativa. Nada aquí constituye consejo legal, médico ni
            una invitación a comprar o consumir sustancias. No promovemos conductas ilegales. Si
            buscas ayuda o información de salud, consulta a profesionales cualificados.
          </p>
        </div>

        <div className="space-y-6">
          <FAQItem
            q="¿Mi compra sería completamente segura al hacer un pedido?"
            a="Esto es una maqueta. En el universo ficticio, la información se cifraría (p. ej., con PGP) y se eliminaría tras el despacho; el empaquetado se realizaría en condiciones controladas. En la realidad, aquí no se procesan pedidos."
          />

          <FAQItem
            q="¿De verdad solo puedo pagar con criptomonedas?"
            a="Dentro de la historia, se aceptarían Bitcoin, Ripple, IOTA o Ethereum y haría falta una billetera digital. En este proyecto no se aceptan pagos de ningún tipo: es solo una demostración."
          />

          <FAQItem
            q="¿Cómo recibiría un pedido de forma anónima?"
            a="En la ficción, la logística sería rápida y discreta. En la práctica, este sitio no envía nada ni ofrece instrucciones para evadir la ley. Cualquier mención a métodos anónimos es un recurso narrativo."
          />

          <FAQItem
            q="¿Sus productos son seguros?"
            a="No existe consumo de drogas sin riesgo. Si tienes dudas sobre salud, busca orientación médica profesional y respeta la legislación vigente. Este proyecto no vende productos ni ofrece guía de consumo."
          />

          <FAQItem
            q="¿Esto es real?"
            a="No. Es un proyecto fan inspirado en una serie y publicado como demo. No hay ventas ni envíos, y nada aquí debe interpretarse como una tienda real."
          />
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f0f10] p-5 ring-1 ring-white/10">
      <h2 className="text-base font-semibold text-white md:text-lg">{q}</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/80 md:text-base">{a}</p>
    </div>
  );
}
