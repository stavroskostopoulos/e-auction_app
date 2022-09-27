package com.di.app.contact;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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
        Contact con = contactRepository.getById(id);

        List<String> peers = con.getPeers();
        peers.add(peerUsername);
        contactRepository.save(con);

    }

}
