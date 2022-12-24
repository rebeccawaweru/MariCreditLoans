import { Modal,Center,FormControl,} from "native-base";

const CustomModal = ({isOpen,onClose,loanID,principal,product,rate,initiation,due,balance,payment,request,}) => {
    return <Center>
        <Modal isOpen={isOpen} onClose={onClose} bottom="0" width="100%" >
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Loan Details</Modal.Header>
            <Modal.Body>
              <FormControl>
               
                <FormControl.Label>LoanID:{loanID}</FormControl.Label>
                <FormControl.Label>Loan Product:{product}</FormControl.Label>
                <FormControl.Label>Principal:{principal}</FormControl.Label>
                <FormControl.Label>Rate:{rate}</FormControl.Label>
                <FormControl.Label>Initiation:{initiation}</FormControl.Label>
                <FormControl.Label>Due:{due}</FormControl.Label>
                {/* <FormControl.Label>Balance:{balance}</FormControl.Label>
                <FormControl.Label>Payment:{payment}</FormControl.Label> */}
                <FormControl.Label>Status:{request}</FormControl.Label>

              </FormControl>
           
            </Modal.Body>
            <Modal.Footer>
            
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>;
  };

  export default CustomModal;