import useService from "@/hooks/useService";
import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Image,
} from "@nextui-org/react";
import { Edit2Icon, Eye, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreatedServicesTable = ({ createdServices = [] }) => {
  const navigate = useNavigate();
  const { setSelectedPreviewImage } = useService();

  return (
    <Table
      className="w-full lg:w-11/12 xl:w-10/12 mt-5 justify-start"
    >
      <TableHeader>
        <TableColumn aria-label="Nombre">Nombre</TableColumn>
        <TableColumn aria-label="Precio">Precio</TableColumn>
        <TableColumn aria-label="Imagen">Imagen</TableColumn>
        <TableColumn className="hidden lg:table-cell" aria-label="Categoría">Categoría</TableColumn>
        <TableColumn className="hidden lg:table-cell" aria-label="Contenido">Contenido</TableColumn>
        <TableColumn aria-label="Estado">Estado</TableColumn>
        <TableColumn aria-label="Acciones">Acciones</TableColumn>
      </TableHeader>
      <TableBody>
        {createdServices.length &&
          createdServices.map((item, index) => {
            return (
              <TableRow key={index} aria-label={`Fila ${index + 1}`}>
                <TableCell aria-label="Título">{item.title}</TableCell>
                <TableCell aria-label="Precio">{item.price} €</TableCell>
                <TableCell aria-label="Imagen">
                  <Image className="cursor-pointer"
                    onClick={
                      () => { setSelectedPreviewImage(item.image)
                        
                       }} src={item.image} width={140} aria-label="Imagen del servicio" />{" "}
                </TableCell>
                <TableCell className="hidden lg:table-cell" aria-label="Categoría">
                  {item.category?.name}
                </TableCell>
                <TableCell className="hidden lg:table-cell" aria-label="Contenido">
                  {item?.content.substring(0, 30) + "..."}
                </TableCell>

                <TableCell aria-label="Estado">Active</TableCell>

                <TableCell aria-label="Acciones">
                  <div className="flex items-center justify-center">
                    <Button isIconOnly size="sm" variant="light">
                      <Eye
                        size={20}
                        className="primary-stroke-class"
                        onClick={() => {
                          navigate(`/servicio/${item.id}`);
                        }}
                      />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onClick={() => {
                        navigate(`/panel-control/edicion-servicio/${item.id}`);
                      }}
                    >
                      <Edit2Icon size={20} className="secondary-stroke-class" />
                    </Button>
                    <Button isIconOnly size="sm" variant="light">
                      <Trash2Icon size={20} className="third-stroke-class" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

export default CreatedServicesTable;