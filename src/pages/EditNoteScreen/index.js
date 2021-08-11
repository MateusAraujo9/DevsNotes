import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    Container,
    TitleInput,
    BodyInput,
    SaveButton,
    SaveButtonImage,
    CloseButton,
    CloseButtonImage,
    DeleteButton,
    DeleteButtonText
} from './styles';
import { Alert } from 'react-native';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const list = useSelector(state => state.notes.list);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState('new');

    useEffect(() => {
        if (route.params?.key != undefined && list[route.params.key]) {
            setStatus('edit');
            setTitle(list[route.params.key].title);
            setBody(list[route.params.key].body);
        }
    }, []);

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: status== 'new' ? 'Nova Anotação' : 'Editar Anotação',
            headerLeft: () => (
                <CloseButton underlaycolor="transparent" onPress={handleCloseButton}>
                    <CloseButtonImage source={require('../../assets/close.png')} />
                </CloseButton>
            ),
            headerRight: () => (
                <SaveButton underlaycolor="transparent" onPress={handleSaveButton}>
                    <SaveButtonImage source={require('../../assets/save.png')} />
                </SaveButton>
            )
        });
    }, [status, title, body]);

    const handleSaveButton = () => {
        if (title != '' && body != '') {
            if (status == 'edit') {
                dispatch({
                    type: 'EDIT_NOTE',
                    payload:{
                        key: route.params.key,
                        title,
                        body
                    }
                });

                navigation.goBack();
            }else {
                dispatch({
                    type: 'ADD_NOTE',
                    payload:{ title, body }
                });

                navigation.goBack();
            }
        } else {
            Alert.alert("Preencha título e corpo!");
        }
    }

    const handleCloseButton = () => {
        navigation.goBack();
    }

    const handleDeleteNoteButton = () => {
        Alert.alert("Atenção", "Confirma exclusão da anotação?", [
            {
                text: "Confirmar",
                onPress: () => {
                    dispatch({
                        type: 'DELETE_NOTE',
                        payload:{key: route.params.key}
                    });
                    navigation.goBack();
                }
            },
            {
                text: "Cancelar",
                onPress: () => null
            }
        ]);
    }

    return (
        <Container>
            <TitleInput 
                placeholder="Digite o título da anotação" 
                placeholderTextColor="#CCC"    
                value={title}
                onChangeText={t=>setTitle(t)}
            />

            <BodyInput 
                placeholder="Digite o corpo da anotação" 
                placeholderTextColor="#CCC"
                multiline={true}
                textAlignVertical="top"
                value={body}
                onChangeText={t=>setBody(t)}
            />

            {status == 'edit' &&
                <DeleteButton underlaycolor="#FF3333" onPress={handleDeleteNoteButton}>
                    <DeleteButtonText>Excluir Anotação</DeleteButtonText>
                </DeleteButton>
            }
        </Container>
    );
}