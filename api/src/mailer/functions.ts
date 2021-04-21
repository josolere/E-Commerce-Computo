import { transporter } from "./config";

export async function test() {
  try {
    await transporter.sendMail({
      from: '"test FROM 👻" <proyectohenry5@gmail.com>', // sender address
      to: "crissoria07@gmail.com", // list of receivers
      subject: "Hello es una prueba ✔ ASUNTO", // Subject line
      text: "Hello world?  ", // plain text body
      html: "<b>Hello world! </b>", // html body
    });
  } catch (error) {
    console.error(error);
  }
}

export async function MailOrderCreate(userEmail: string) {
  try {
    await transporter.sendMail({
      from: '"Compu Henry" <proyectohenry5@gmail.com>', // sender address
      to: userEmail, // list of receivers
      subject: "Datos de tu pedido en COMPU HENRY ✔", // Subject line
      html: `
      <b>¡Felicitaciones ya tenes tu reserva hecha!</b>
      <p> CONDICIONES ACEPTADAS </p>
      <p>Acepto informar el pago mediante el sitio web antes de la fecha de vencimiento de mi reserva y comprendo que de no hacerlo mi pedido será dado de baja teniendo que volver a realizar uno nuevo con los precios y stock actualizados.</p>
      `,
    });
  } catch (error) {
    console.error(error);
  }
}
