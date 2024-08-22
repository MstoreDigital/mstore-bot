const commands = {
	utils: {
		thread: {
			content:
				'# Welcome to Support'+
				'\n\nHello! If you need help relating to any of our products or services, we are here to help. Please follow these simple steps:'+
				'\n\n1. Click the button below to open a private room.'+
				'\n2. Answer a few questions to help us better understand your issue.'+
				'\n3. Once all questions are answered, you can confirm and receive personalized support for your issue.'+
				'\n4. You will have complete privacy and can close the room at any time.'+
				'\n\nWe look forward to helping you! Click below to get started.',
			btnLabel: 'Open Support Room',
			callSupport: {
				startMessage: 'Hello <@{userId}>, you have up to 60 minutes to answer the questions that will be asked, based on them we will be able to find someone capable of helping you! You can close this conversation at any time with the `/close` command.',
				question1: 'Which of our products do you need support with?',
				question2: 'What type of problem did you encounter? For example, problems related to features, plans, payments, among others...',
				question3: 'Describe what you need in more detail.',
				supportRequested: 'Your request for help has been sent to support, we ask you to wait, you will be answered shortly.',
				answerCallLabel: 'Answer call',
				supportMessage:
					'# New call: help-{userId}'+
					'\n\nLanguage: `{language}`'+
					'\nProduct: `{product}`'+
					'\nProblem type: `{problemType}`'+
					'\nProblem description: ```{problemDescription}```'
			},
			answerCall: {
				supportEnter: '<@{userToSupportId}>, support member: <@{userId}> joined the chat.'
			}
		},
		close: {
			channelTypeInvalid: 'The command cannot be used in this channel.'
		}
	}
}

export const en_US = {
	...commands
}
