package com.di.app.contact;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;

    public List<String> GetContacts(Long id) {
        return contactRepository.getContacts(id);
    }

    public void AddContact(Long id, String peerUsername) {
        Contact test = contactRepository.contactExists(id);

        Contact con;
        if(test == null){
            con = new Contact(id,new ArrayList<>());
        }
        else {
            con = contactRepository.getById(id);
        }

        List<String> peers = con.getPeers();

        if(!peers.contains(peerUsername)){
            peers.add(peerUsername);
        }

        contactRepository.save(con);
    }

}
