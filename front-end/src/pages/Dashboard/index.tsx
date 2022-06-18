import React, { useCallback, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import "react-day-picker/lib/style.css";
import ImageStorage from "../../models/imageStorage";

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  ImagesProfile,
  NextBaseUrlImage,
} from "./styles";

const Dashboard: React.FC = () => {
  const socket = io("http://localhost:3001");

  const [images, setImages] = useState<ImageStorage[]>([]);

  const handlerLoadImages = useCallback(() => {
    socket.emit("images.init", {});
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      socket.on("lstImages.message", (data) => {
        console.log('recebendo mensagem: ', data);
        setImages(data);
      });
    });
  }, [images]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <div>
              <span>Bem-vindo,</span>
              <strong> 55PBX </strong>
            </div>
          </Profile>
        </HeaderContent>
      </Header>

      <Content>
        <ImagesProfile>
          <a onClick={() => handlerLoadImages()}>
            Click aqui para iniciar a captura
          </a>
          <h1>Imagens capturadas</h1>
          <strong>Depois que iniciar a captura, as imagens são carregadas automaticamentes pelo SocketIO</strong>
          {images.map((image) => (
            <NextBaseUrlImage key={image.id}>
              <div key={image.id}>
                <img src={image.url} />
                <strong>{image.baseUrl}</strong>
              </div>
            </NextBaseUrlImage>
          ))}
        </ImagesProfile>
      </Content>
    </Container>
  );
};

export default Dashboard;
