import React from "react";
import { Tabs, Tab, Divider, Button } from "@nextui-org/react";
import { CalendarDays, MessageCircleMore,SettingsIcon } from "lucide-react";

const UserData = ({ userFireBase, userDB, internal }) => {
  const userTag = userFireBase?.email.split("@")[0];
  const getCreatedAt = new Date(userDB?.createdAt).toLocaleDateString();

  const userCreatedArtworks = [];
  const userCommentedArtworks = [];

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <img
          src={userFireBase.photoURL}
          alt=""
          className="w-40 h-40 rounded-full -mt-10 border-4 border-white"
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold">{userFireBase?.displayName}</h1>
          <p className="text-gray-500">@{userTag}</p>
          <div className="flex gap-2 justify-center">
            <p className="text-gray-500">Created at {getCreatedAt}</p>
            <CalendarDays className="w-4" />
          </div>
        </div>
        <p className="text-xl mt-6">{userDB?.label || "User in Marbid"}</p>
        <p className="w-[20em] md:w-[55em] mt-3">
          {userDB?.decription ||
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt laboriosam aperiam laborum nihil odio fugiat earum quisquam, omnis repudiandae sit vel provident quo dolor similique rerum eum, unde dolorem dolorum?"}
        </p>
        {!internal && (
          <Button
            radius="sm"
            className="mt-5 primary-color-class text-white py-0 px-10"
            startContent={
              <MessageCircleMore size={20} color="#ffffff" strokeWidth={2} />
            }
          >
            Contactar
          </Button>
        )}
        {internal && (
          <Button
            radius="sm"
            className="mt-5 secondary-color-class text-white py-0 px-10"
            startContent={
              <SettingsIcon size={20} color="#ffffff" strokeWidth={2} />
            }
          >
            Editar Perfil
          </Button>
        )}
      </div>
      <div className="flex flex-col items-center">
        <Divider className="w-11/12 mt-10" />
        <Tabs aria-label="Options" variant="underlined">
          <Tab key="created-ofers" title="Servicios Creados">{userCreatedArtworks && userCreatedArtworks.length ? "" : "Este usuario no ha publicado servicios" }</Tab>
          <Tab key="like-ofers" title="Comentarios">{userCommentedArtworks && userCommentedArtworks.length ? "" : "Este usuario no ha commentado" }</Tab>
        </Tabs>
      </div>
    </>
  );
};

export default UserData;
