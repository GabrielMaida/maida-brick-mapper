#Requires AutoHotkey v2.0
#SingleInstance Force

CoordMode("Mouse", "Screen")

; ==============================================================================
; AUTOMAÇÃO DE INICIALIZAÇÃO E FECHAMENTO
; ==============================================================================

; Se o LEGO Hobbit não estiver aberto, inicia ele automaticamente pela Steam
if !WinExist("ahk_exe LEGOHobbit.exe") {
	Run("steam://rungameid/285160")
	WinWait("ahk_exe LEGOHobbit.exe")
}

; Executa o loop do mouse a cada 10 milissegundos
SetTimer(CheckMouse, 10)

; Verifica a cada 3 segundos se o jogo foi fechado para encerrar o script
SetTimer(CheckGameClose, 3000)

CheckGameClose() {
	if !WinExist("ahk_exe LEGOHobbit.exe") {
		ExitApp()
	}
}
; ==============================================================================

; REGRAS DE ATALHOS - Só funcionam se o jogo estiver ativo em primeiro plano
#HotIf WinActive("ahk_exe LEGOHobbit.exe")

; 1. Cliques do mouse mapeados para ações
LButton::H
RButton::J

; 2. Scroll do mouse mapeado para troca de personagens (Com cooldown)
WheelUp:: {
	Send("{LShift down}")
	Sleep(50)
	Send("{LShift up}")
	Sleep(150)
}

WheelDown:: {
	Send("{LCtrl down}")
	Sleep(50)
	Send("{LCtrl up}")
	Sleep(150)
}

#HotIf ; Fecha o bloco de atalhos protegidos

; FUNÇÃO DA CÂMERA - Rotação contínua e fluida
CheckMouse() {
	if !WinActive("ahk_exe LEGOHobbit.exe") {
		return
	}

	centerX := A_ScreenWidth // 2
	centerY := A_ScreenHeight // 2

	MouseGetPos(&currentX, &currentY)
	
	threshold := 3 
	
	; EIXO X - Esquerda e Direita
	if (currentX > centerX + threshold) {
		if !GetKeyState("Right") {
			Send("{Right down}")
		}
		if GetKeyState("Left") {
			Send("{Left up}")
		}
	} else if (currentX < centerX - threshold) {
		if !GetKeyState("Left") {
			Send("{Left down}")
		}
		if GetKeyState("Right") {
			Send("{Right up}")
		}
	} else {
		if GetKeyState("Right") {
			Send("{Right up}")
		}
		if GetKeyState("Left") {
			Send("{Left up}")
		}
	}
	
	; EIXO Y - Para cima e Para baixo
	if (currentY > centerY + threshold) {
		if !GetKeyState("Down") {
			Send("{Down down}")
		}
		if GetKeyState("Up") {
			Send("{Up up}")
		}
	} else if (currentY < centerY - threshold) {
		if !GetKeyState("Up") {
			Send("{Up down}")
		}
		if GetKeyState("Down") {
			Send("{Down up}")
		}
	} else {
		if GetKeyState("Down") {
			Send("{Down up}")
		}
		if GetKeyState("Up") {
			Send("{Up up}")
		}
	}
	
	; Puxa o mouse de volta para o centro com suavidade (Velocidade 4)
	; 0 é teleporte instantâneo, 4 cria um micro-deslizamento suave para a "volta"
	MouseMove(centerX, centerY, 4)
}