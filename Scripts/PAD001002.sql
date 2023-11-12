SET SEARCH_PATH TO AD;

DROP TYPE IF EXISTS PAD001002_RESULTSET CASCADE;

CREATE TYPE PAD001002_RESULTSET AS (
    CD_ERRO      NUMERIC(3),
    DS_ERRO      VARCHAR(255),
    EV001_IT_ID  NUMERIC
);

CREATE OR REPLACE FUNCTION PAD001002 (
  /*-----------------------------------------------------------
    Rotina para insert, update e delete de Eventos
   ------------------------------------------------------------*/
    ENT_NR_VRS       NUMERIC(5)  , /* Stored Procedure version */
    ENT_VC_ACTION    CHAR(1)     , /* Action:                  */
                                   /*   I - Insert             */
                                   /*   U - Update             */
                                   /*   D - Delete             */
    ENT_IT_INSTID    INTEGER     , /* ID da Instituição        */
    ENT_IT_EVNID     INTEGER     , /* ID do Evento             */
    ENT_VC_END       VARCHAR     , /* Endereço                 */
    ENT_IT_NUM       NUMERIC     , /* Número do endereço       */
    ENT_VC_COMPL     VARCHAR(30) , /* Complemento              */
    ENT_VC_BAIRRO    VARCHAR     , /* Bairro                   */
    ENT_VC_CIDADE    VARCHAR     , /* Cidade                   */
    ENT_VC_CEP       VARCHAR(8)  , /* CEP                      */
    ENT_VC_ESTADO    VARCHAR(2)  , /* Estado                   */
    ENT_VC_TITULO    VARCHAR     , /* Titulo                   */
    ENT_DT_INIC      NUMERIC(8)  , /* Data Inicio              */
    ENT_HR_INIC      NUMERIC(4)  , /* Hora Inicio              */
    ENT_DT_FIM       NUMERIC(8)  , /* Data Fim                 */
    ENT_HR_FIM       NUMERIC(4)  , /* Hora Fim                 */
    ENT_IT_NPART     NUMERIC     , /* Número de Participantes  */
    ENT_VC_FMSG1     VARCHAR(90) , /* Folder MSG 1             */
    ENT_VC_FMSG2     VARCHAR(90) , /* Folder MSG 2             */
    ENT_VC_FMSG3     VARCHAR(193), /* Folder MSG 3             */
    ENT_VC_FMSG4     VARCHAR(135), /* Folder MSG 4             */
    ENT_VC_FMSG5     VARCHAR(193), /* Folder MSG 5             */
    ENT_VC_PMSG1     VARCHAR(193), /* Pagina MSG 1             */
    ENT_VC_PMSG2     VARCHAR(168), /* Pagina MSG 2             */
    ENT_VC_IMG1      VARCHAR     , /* Imagem 1                 */
    ENT_VC_IMG2      VARCHAR     , /* Imagem 2                 */
    ENT_IT_ATV1      INTEGER     , /* ID Atividade 1           */
    ENT_IT_ATV2      INTEGER     , /* ID Atividade 2           */
    ENT_IT_ATV3      INTEGER     , /* ID Atividade 3           */
    ENT_IT_SITUAC    NUMERIC       /* Situação                 */
)
   RETURNS SETOF PAD001002_RESULTSET
AS $$

DECLARE
    _R        AD.PAD001002_RESULTSET%Rowtype;
    _CD_ERRO  NUMERIC;
    _DS_ERRO  VARCHAR(255);

BEGIN

IF ENT_VC_ACTION = 'I' THEN

    IF NOT EXISTS (SELECT * FROM AD.AD001 WHERE AD001_IT_ID = ENT_IT_INSTID) THEN
        RAISE EXCEPTION 'INSTITUIÇÃO NÃO LOCALIZADA PARA CRIAÇÃO DO EVENTO';
    END IF;

    INSERT INTO EV.EV001 (
        EV001_IT_INST,
        EV001_VC_END,
        EV001_IT_NUM,
        EV001_VC_COMPL,
        EV001_VC_BAIRRO,
        EV001_VC_CIDADE,
        EV001_VC_CEP,
        EV001_VC_ESTADO,
        EV001_VC_PAIS,
        EV001_VC_TITULO,
        EV001_DT_INIC,
        EV001_HR_INIC,
        EV001_DT_FIM,
        EV001_HR_FIM,
        EV001_IT_NPART,
        EV001_VC_FMSG1,
        EV001_VC_FMSG2,
        EV001_VC_FMSG3,
        EV001_VC_FMSG4,
        EV001_VC_FMSG5,
        EV001_VC_PMSG1,
        EV001_VC_PMSG2,
        EV001_VC_IMG1,
        EV001_VC_IMG2,
        EV001_IT_ATV1,
        EV001_IT_ATV2,
        EV001_IT_ATV3,
        EV001_IT_SITUAC,
        EV001_DT_ULTATU,
        EV001_DT_INCLUS
    )
    VALUES (ENT_IT_INSTID,
            ENT_VC_END,
            ENT_IT_NUM,
            ENT_VC_COMPL,
            ENT_VC_BAIRRO,
            ENT_VC_CIDADE,
            ENT_VC_CEP,
            ENT_VC_ESTADO,
            'BR',
            ENT_VC_TITULO,
            ENT_DT_INIC,
            ENT_HR_INIC,
            ENT_DT_FIM,
            ENT_HR_FIM,
            ENT_IT_NPART,
            ENT_VC_FMSG1,
            ENT_VC_FMSG2,
            ENT_VC_FMSG3,
            ENT_VC_FMSG4,
            ENT_VC_FMSG5,
            ENT_VC_PMSG1,
            ENT_VC_PMSG2,
            ENT_VC_IMG1,
            ENT_VC_IMG2,
            ENT_IT_ATV1,
            ENT_IT_ATV2,
            ENT_IT_ATV3,
            ENT_IT_SITUAC,
            NOW(),
            NOW()
    );


    _CD_ERRO := 0;
    _DS_ERRO := 'OK';

ELSIF ENT_VC_ACTION = 'U' THEN

    IF ENT_IT_INSTID IS NULL OR ENT_IT_INSTID = 0 THEN
        RAISE EXCEPTION 'INFORMAR O CÓDIGO DA INSTITUIÇÃO PARA ATUALIZAÇÃO DO EVENTO';
    END IF;

    IF ENT_IT_EVNID IS NULL OR ENT_IT_EVNID = 0 THEN
        RAISE EXCEPTION 'INFORMAR O CÓDIGO DO EVENTO PARA ATUALIZAÇÃO';
    END IF;

    IF NOT EXISTS (SELECT * FROM AD.AD001 WHERE AD001_IT_ID = ENT_IT_INSTID) THEN
        RAISE EXCEPTION 'INSTITUIÇÃO NÃO LOCALIZADA';
    END IF;

    IF NOT EXISTS (SELECT * FROM EV.EV001 WHERE EV001_IT_ID = ENT_IT_EVNID) THEN
        RAISE EXCEPTION 'EVENTO NÃO LOCALIZADO';
    END IF;

    UPDATE
      EV.EV001
    SET
        EV001_VC_END = ENT_VC_END,
        EV001_IT_NUM = ENT_IT_NUM,
        EV001_VC_COMPL = ENT_VC_COMPL,
        EV001_VC_BAIRRO = ENT_VC_BAIRRO,
        EV001_VC_CIDADE = ENT_VC_CIDADE,
        EV001_VC_CEP = ENT_VC_CEP,
        EV001_VC_ESTADO = ENT_VC_ESTADO,
        EV001_VC_TITULO = ENT_VC_TITULO,
        EV001_DT_INIC = ENT_DT_INIC,
        EV001_HR_INIC = ENT_HR_INIC,
        EV001_DT_FIM = ENT_DT_FIM,
        EV001_HR_FIM = ENT_HR_FIM,
        EV001_IT_NPART = ENT_IT_NPART,
        EV001_VC_FMSG1 = ENT_VC_FMSG1,
        EV001_VC_FMSG2 = ENT_VC_FMSG2,
        EV001_VC_FMSG3 = ENT_VC_FMSG3,
        EV001_VC_FMSG4 = ENT_VC_FMSG4,
        EV001_VC_FMSG5 = ENT_VC_FMSG5,
        EV001_VC_PMSG1 = ENT_VC_PMSG1,
        EV001_VC_PMSG2 = ENT_VC_PMSG2,
        EV001_VC_IMG1 = ENT_VC_IMG1,
        EV001_VC_IMG2 = ENT_VC_IMG2,
        EV001_IT_ATV1 = ENT_IT_ATV1,
        EV001_IT_ATV2 = ENT_IT_ATV2,
        EV001_IT_ATV3 = ENT_IT_ATV3,
        EV001_IT_SITUAC = ENT_IT_SITUAC,
        EV001_DT_ULTATU = NOW()
    WHERE
        EV001_IT_INST = ENT_IT_INSTID
    AND EV001_IT_ID = ENT_IT_EVNID;

    _CD_ERRO := 0;
    _DS_ERRO := 'OK';

ELSE

    IF ENT_IT_INSTID IS NULL OR ENT_IT_INSTID = 0 THEN
        RAISE EXCEPTION 'INFORMAR O CÓDIGO DA INSTITUIÇÃO PARA DELETAR O EVENTO';
    END IF;

    IF ENT_IT_EVNID IS NULL OR ENT_IT_EVNID = 0 THEN
        RAISE EXCEPTION 'INFORMAR O CÓDIGO DO EVENTO PARA DELETAR';
    END IF;

    IF NOT EXISTS (SELECT * FROM AD.AD001 WHERE AD001_IT_ID = ENT_IT_INSTID) THEN
        RAISE EXCEPTION 'INSTITUIÇÃO NÃO LOCALIZADA';
    END IF;

    IF NOT EXISTS (SELECT * FROM EV.EV001 WHERE EV001_IT_ID = ENT_IT_EVNID) THEN
        RAISE EXCEPTION 'EVENTO NÃO LOCALIZADO';
    END IF;

    UPDATE
        EV.EV001
    SET
        EV001_IT_SITUAC = 0,
        EV001_DT_ULTATU = NOW()
    WHERE
        EV001_IT_INST = ENT_IT_INSTID
    AND EV001_IT_ID = ENT_IT_EVNID;

    _CD_ERRO := 0;
    _DS_ERRO := 'OK';

END IF;

/*===========================================================================*/
/*= RESULT SET                                                              =*/
/*===========================================================================*/
FOR _R IN
  SELECT
    _CD_ERRO,
    _DS_ERRO,
    (SELECT EV001_IT_ID FROM EV.EV001 WHERE EV001_IT_INST = ENT_IT_INSTID ORDER BY EV001_DT_ULTATU DESC LIMIT 1)
  LOOP
    RETURN NEXT _R;
  END LOOP;

  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
  /*::                      EXCEPTION HANDLING POSTGRES                    ::*/
  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
EXCEPTION WHEN OTHERS THEN
  _DS_ERRO   := SQLERRM;
  _CD_ERRO   := -1;
  FOR _R IN
    SELECT
      _CD_ERRO,
      _DS_ERRO
    LOOP
      RETURN NEXT _R;
  END LOOP;
  RETURN;
END
$$ LANGUAGE PLPGSQL;