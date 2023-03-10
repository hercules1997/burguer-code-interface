import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import ImgHomeBurguer from '../../assets/ImgHomeBurguer.png'
import Button from '../../components/Button/index'
import { useUser } from '../../hooks/UserContext'
import apiTopBurger from '../../services/api'
import {
  Container,
  HomeImage,
  ContainerItens,
  Label,
  Input,
  ErrorMessage,
  SingLink
} from './style'

function Home () {
  const { putUserData } = useUser()

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Por favor digite um e-mail válido')
      .required('E-mail é obrigatório'),
    password: Yup.string()
      .required('Senha obrigatória')
      .min(8, 'Senha deve ter no mínimo 8 digitos')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (clientData) => {
    const { data } = await toast.promise(
      apiTopBurger.post('sessions', {
        email: clientData.email,
        password: clientData.password
      }),
      {
        pending: 'Verificando seus dados...',
        success: 'Seja bem-vindo(a)!',
        error: 'Dados incorretos'
      }
    )

    putUserData(data)
  }

  return (
    <Container>
      <HomeImage src={ImgHomeBurguer} />

      <ContainerItens>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <h1>Home</h1>
          <Label>E-mail</Label>
          <Input
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label>Senha</Label>
          <Input
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Button type="submit">Entrar</Button>
          <SingLink>
            Não tem cadastro ainda?{' '}
            <Link to="/register">Cadastre-se agora!</Link>
          </SingLink>
        </form>
      </ContainerItens>
    </Container>
  )
}

export default Home
