const commands = {
	utils: {
		thread: {
			content:
				'# Bem-vindo ao Suporte'+
				'\n\nOlá! Se você precisa de ajuda relacionada a qualquer um dos nossos produtos ou serviços, estamos aqui para ajudar. Por favor, siga estas simples etapas:'+
				'\n\n1. Clique no botão abaixo para abrir uma sala privada.'+
				'\n2. Responda algumas perguntas para nos ajudar a entender melhor o seu problema.'+
				'\n3. Uma vez que todas as perguntas sejam respondidas, você poderá confirmar e receberá suporte personalizado para o seu problema.'+
				'\n4. Você terá total privacidade e pode encerrar a sala a qualquer momento.'+
				'\n\nEstamos ansiosos para ajudá-lo! Clique abaixo para começar.',
			btnLabel: 'Abrir Sala de Suporte',
			callSupport: {
				startMessage: 'Olá <@{userId}>, você tem até 60 minutos para responder as perguntas que serão feitas, com base nelas poderemos encontrar alguém capaz de te ajudar! Você pode encerrar esta conversa a qualquer momento com o comando `/close`.',
				question1: 'Você precisa de suporte para qual de nossos produtos?',
				question2: 'Que tipo de problema você encontrou? Por exemplo, problemas relacionados com funcionalidades, planos, pagamentos, entre outros...',
				question3: 'Descreva o que você precisa com mais detalhes.',
				supportRequested: 'O seu pedido por ajuda foi enviado ao suporte, pedimos para que aguarde, você logo será atendido.',
				answerCallLabel: 'Atender chamado',
				supportMessage:
					'# Novo chamado: help-{userId}'+
					'\n\nIdioma: `{language}`'+
					'\nProduto: `{product}`'+
					'\nTipo de problema: `{problemType}`'+
					'\nDescrição do problema: ```{problemDescription}```'
			},
			answerCall: {
				supportEnter: '<@{userToSupportId}>, o membro do suporte: <@{userId}> entrou no chat.'
			}
		},
		close: {
			channelTypeInvalid: 'O comando não pode ser usado nesse canal.',
			closureReasonRequestMessage: 'Por favor, informe o motivo do encerramento do ticket:',
			historyMessage: 
				'**Ticket ID: ** {id}'+
				'\n\n**Nome do canal: ** `{channelName}`'+
				'\n**Data do atendimento: ** `{createdAt}`'+
				'\n**Usuário: ** {username}'+
				'\n**Moderador responsável: ** {moderatorName}'+
				'\n**Atendimento encerrado por: ** {closedBy}'+
				'\n**Motivo de encerramento: ** ```{reason}```',
			moderatorUnknown: 'Não atribuído',
			ticketClosed: "Atendimento encerrado com sucesso! O canal será fechado em 5 segundos."
		},
		giveUp: {
			channelTypeInvalid: 'O comando não pode ser usado nesse canal.',
			userUnauthorized: 'Você não tem permissão para executar esse comando.',
			giveUpMessage: 
				'**Desistência - Ticket ID: ** {id}'+
				'\n\n**Nome do canal: ** `{channelName}`'+
				'\n**Data do atendimento: ** `{createdAt}`'+
				'\n**Usuário: ** {username}'+
				'\n**Usuário que desistiu: ** {UserWhoGaveUp}'+
				'\n**Motivo da desistência: ** ```{reason}```',
			successMessage: 'O membro do suporte {moderator} desistiu do atendimento, seu chamado será reaberto e em breve você será atendido.',
			removeFailed: 'Falha ao remover',
			supportMessage:
					'# Chamado reaberto: help-{userId}'+
					'\n\nIdioma: `{language}`'+
					'\nProduto: `{product}`'+
					'\nTipo de problema: `{problemType}`'+
					'\nDescrição do problema: ```{problemDescription}```'
		}
	}
}

export const pt_BR = {
	...commands
}
